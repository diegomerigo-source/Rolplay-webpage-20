import { notFound } from 'next/navigation';
import BlogPost from '@/views/BlogPost';
import { getBlogBySlug, getRelatedArticles, incrementViews } from '@/lib/blog';

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: 'Not Found | RolPlay' };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rolplay.ai';
  const description = blog.summary.replace(/<[^>]+>/g, '').slice(0, 160);
  return {
    title: `${blog.title} | RolPlay Blog`,
    description,
    keywords: blog.tags.join(', '),
    openGraph: {
      title: blog.title,
      description,
      url: `${siteUrl}/blog/${blog.slug}`,
      type: 'article',
      publishedTime: blog.createdAt,
      images: blog.coverImage ? [{ url: blog.coverImage, width: 1200, height: 630, alt: blog.title }] : [],
    },
    twitter: { card: 'summary_large_image', title: blog.title, description, images: blog.coverImage ? [blog.coverImage] : [] },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  const related = await getRelatedArticles(slug, blog.tags).catch(() => []);

  // Increment views in the background (non-blocking)
  incrementViews(slug).catch(() => {});

  return <BlogPost post={blog} relatedArticles={related} />;
}
