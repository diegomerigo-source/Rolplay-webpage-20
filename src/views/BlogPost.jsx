'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PageShell from '@/components/PageShell';
import BlogPostContent from '@/components/BlogPostContent';
import RelatedArticles from '@/components/RelatedArticles';
import { useTranslation } from 'react-i18next';

export default function BlogPost({ post, relatedArticles = [] }) {
  const { t } = useTranslation();

  return (
    <PageShell testid="blog-post-page">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        {/* Back link */}
        <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-zinc-500 hover:text-[#C0392B] uppercase transition mb-12 group">
          <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
          {t('blog.title')}
        </Link>

        <BlogPostContent blog={post} />
        <RelatedArticles articles={relatedArticles} currentSlug={post.slug} />
      </div>
    </PageShell>
  );
}
