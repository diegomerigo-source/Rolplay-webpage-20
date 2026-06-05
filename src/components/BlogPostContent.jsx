'use client';
import { Calendar, Clock, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function BlogPostContent({ blog }) {
  const { t } = useTranslation();
  const readingTime = blog.readingTime || 1;

  return (
    <article className="max-w-3xl mx-auto" data-testid="blog-post-content">
      <header className="mb-10">
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {blog.tags.map((tag) => (
              <span key={tag} className="font-mono text-[9px] tracking-[0.2em] text-[#C0392B] uppercase border border-[#C0392B]/30 rounded-full px-2.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter mb-6">
          {blog.title}
        </h1>

        <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] tracking-[0.2em] text-zinc-500 uppercase pb-8 border-b border-white/5">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {formatDate(blog.createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {readingTime} {t('blog.minRead')}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={12} />
            {(blog.views || 0).toLocaleString()} {t('blog.views')}
          </span>
        </div>
      </header>

      {blog.coverImage && (
        <div className="mb-10 rounded-2xl overflow-hidden">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-auto" loading="eager" />
        </div>
      )}

      <div
        className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-[#C0392B] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-[#C0392B] prose-pre:glass prose-blockquote:border-[#C0392B]"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
        <p className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mt-10 pt-6 border-t border-white/5">
          Last updated: {formatDate(blog.updatedAt)}
        </p>
      )}
    </article>
  );
}
