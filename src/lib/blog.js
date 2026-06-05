import dbConnect from '@/lib/db';
import { Blog } from '@/models/Blog';

const BLOGS_PER_PAGE = 12;

export async function getBlogs({ page = 1, limit = BLOGS_PER_PAGE, search, tags } = {}) {
  const conn = await dbConnect();
  if (!conn) return { blogs: [], pagination: { page, limit, total: 0, totalPages: 0 } };

  const skip = (page - 1) * limit;
  const query = { published: true };
  if (search) query.$text = { $search: search };
  if (tags) query.tags = { $in: tags.split(',').map((t) => t.trim()) };

  const [blogs, total] = await Promise.all([
    Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).select('-content').lean(),
    Blog.countDocuments(query),
  ]);

  return {
    blogs: blogs.map((b) => ({ ...b, _id: b._id.toString(), createdAt: b.createdAt.toISOString(), updatedAt: b.updatedAt.toISOString() })),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

export async function getBlogBySlug(slug) {
  const conn = await dbConnect();
  if (!conn) return null;
  const blog = await Blog.findOne({ slug, published: true }).lean();
  if (!blog) return null;
  return { ...blog, _id: blog._id.toString(), createdAt: blog.createdAt.toISOString(), updatedAt: blog.updatedAt.toISOString() };
}

export async function getRelatedArticles(slug, tags, limit = 3) {
  const conn = await dbConnect();
  if (!conn) return [];
  const related = await Blog.find({ slug: { $ne: slug }, published: true, tags: { $in: tags } })
    .sort({ createdAt: -1 }).limit(limit).select('title slug tags createdAt').lean();
  return related.map((a) => ({ ...a, _id: a._id.toString(), createdAt: a.createdAt.toISOString() }));
}

export async function getAllTags() {
  const conn = await dbConnect();
  if (!conn) return [];
  return Blog.aggregate([
    { $match: { published: true } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { _id: 0, tag: '$_id', count: 1 } },
  ]);
}

export async function incrementViews(slug) {
  const conn = await dbConnect();
  if (!conn) return;
  await Blog.updateOne({ slug }, { $inc: { views: 1 } });
}
