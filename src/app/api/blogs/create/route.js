import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import { blogCreateSchema } from '@/lib/validations';

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function calculateReadingTime(content) {
  const text = content.replace(/<[^>]+>/g, ' ');
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
}

export async function POST(request) {
  const apiKey = request.headers.get('x-api-key');
  if (!process.env.ADMIN_API_KEY || apiKey !== process.env.ADMIN_API_KEY) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const result = blogCreateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ success: false, error: 'Validation failed', message: result.error.issues.map((e) => e.message).join(', ') }, { status: 400 });
  }

  const { title, summary, content, coverImage, tags, source, published } = result.data;
  await dbConnect();

  const baseSlug = generateSlug(title);
  const existing = await Blog.find({ slug: new RegExp(`^${baseSlug}(-\\d+)?$`, 'i') }, 'slug').lean();
  const existingSlugs = existing.map((s) => s.slug);
  let slug = baseSlug;
  let counter = 1;
  while (existingSlugs.includes(slug)) { slug = `${baseSlug}-${counter++}`; }

  const blog = await Blog.create({ title, slug, summary, content, coverImage, tags: tags || [], source, published: published ?? true, readingTime: calculateReadingTime(content) });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rolplay.ai';

  return NextResponse.json({ success: true, data: { slug: blog.slug, url: `${siteUrl}/blog/${blog.slug}` } }, { status: 201 });
}
