'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Eye } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import NeuralNetwork from '@/components/NeuralNetwork';
import { useTranslation } from 'react-i18next';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function BlogCard({ blog }) {
  const { t } = useTranslation();
  const readingTime = blog.readingTime || 1;

  return (
    <Link href={`/blog/${blog.slug}`} className="block h-full group" data-testid="blog-card">
      <GlassCard tilt={false} className="h-full flex flex-col overflow-hidden">
        {/* Cover image */}
        <div className="relative aspect-video overflow-hidden bg-[#0A0A0E] shrink-0">
          {blog.coverImage ? (
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <NeuralNetwork className="opacity-20" density={0.00004} />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="font-mono text-[9px] tracking-[0.2em] text-[#C0392B] uppercase border border-[#C0392B]/30 rounded-full px-2.5 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2 className="font-display text-xl leading-tight mb-2 line-clamp-2 group-hover:text-[#C0392B] transition-colors duration-300">
            {blog.title}
          </h2>

          <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {blog.summary.replace(/<[^>]+>/g, '')}
          </p>

          <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-600 pt-4 border-t border-white/5">
            <time dateTime={new Date(blog.createdAt).toISOString()}>
              {formatDate(blog.createdAt)}
            </time>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {readingTime} {t('blog.minRead')}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={10} />
              {(blog.views || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
