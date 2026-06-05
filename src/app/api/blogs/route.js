import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';
import { paginationSchema } from '@/lib/validations';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const params = paginationSchema.parse({
      page: searchParams.get('page') || 1,
      limit: searchParams.get('limit') || 12,
      search: searchParams.get('search'),
      tags: searchParams.get('tags'),
    });

    const skip = (params.page - 1) * params.limit;
    const query = { published: true };
    if (params.search) query.$text = { $search: params.search };
    if (params.tags) query.tags = { $in: params.tags.split(',').map((t) => t.trim()) };

    const [blogs, total] = await Promise.all([
      Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(params.limit).select('-content').lean(),
      Blog.countDocuments(query),
    ]);

    return NextResponse.json({ success: true, data: blogs, pagination: { page: params.page, limit: params.limit, total, totalPages: Math.ceil(total / params.limit) } });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
