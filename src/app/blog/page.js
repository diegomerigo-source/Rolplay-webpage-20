import BlogList from '@/views/BlogList';
import { getBlogs, getAllTags } from '@/lib/blog';

export const revalidate = 3600;

export const metadata = {
  title: 'Blog | RolPlay',
  description: 'Insights, analysis, and reports from the Rolplay team.',
};

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;

  const [blogsResult, tagsResult] = await Promise.all([
    getBlogs({ page: Number(params.page) || 1, search: params.search, tags: params.tags })
      .catch(() => ({ blogs: [], pagination: { page: 1, totalPages: 0, total: 0, limit: 12 } })),
    getAllTags().catch(() => []),
  ]);

  return (
    <BlogList
      initialBlogs={blogsResult.blogs}
      initialPagination={blogsResult.pagination}
      tags={tagsResult.map((t) => t.tag)}
    />
  );
}
