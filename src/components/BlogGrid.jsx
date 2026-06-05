'use client';
import BlogCard from '@/components/BlogCard';
import { useTranslation } from 'react-i18next';

export default function BlogGrid({ blogs }) {
  const { t } = useTranslation();

  if (!blogs || blogs.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">{t('blog.noResults')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}
