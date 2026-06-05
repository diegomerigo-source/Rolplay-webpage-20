import { NextResponse } from 'next/server';
import { getBlogBySlug } from '@/lib/blog';

export async function GET(_req, { params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true, data: blog });
}
