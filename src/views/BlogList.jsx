'use client';
import { motion } from 'framer-motion';
import PageShell from '@/components/PageShell';
import NeuralNetwork from '@/components/NeuralNetwork';
import SectionHeader from '@/components/SectionHeader';
import BlogGrid from '@/components/BlogGrid';
import BlogSearchBar from '@/components/BlogSearchBar';
import BlogTagFilter from '@/components/BlogTagFilter';
import BlogPagination from '@/components/BlogPagination';
import { useTranslation } from 'react-i18next';

export default function BlogList({ initialBlogs = [], initialPagination = { page: 1, totalPages: 1 }, tags = [] }) {
  const { t } = useTranslation();

  return (
    <PageShell testid="blog-list-page">
      {/* HERO */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden" data-testid="blog-hero">
        <NeuralNetwork className="opacity-30" density={0.00007} />
        <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(192,57,43,0.18), transparent 60%)' }} />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-20 pb-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <SectionHeader
              overline={t('blog.latestOverline')}
              title={t('blog.title')}
              body={t('blog.subtitle')}
            />
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative py-16" data-testid="blog-content">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Search + Tags */}
          <div className="flex flex-col gap-4 mb-10">
            <BlogSearchBar />
            <BlogTagFilter tags={tags} />
          </div>

          <BlogGrid blogs={initialBlogs} />
          <BlogPagination currentPage={initialPagination.page} totalPages={initialPagination.totalPages} />
        </div>
      </section>
    </PageShell>
  );
}
