'use client';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { useTranslation } from 'react-i18next';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function RelatedArticles({ articles, currentSlug }) {
  const { t } = useTranslation();
  const filtered = (articles || []).filter((a) => a.slug !== currentSlug).slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <aside className="mt-16 pt-10 border-t border-white/5" data-testid="related-articles">
      <h2 className="font-display text-3xl md:text-4xl mb-6">{t('blog.relatedArticles')}</h2>
      <div className="space-y-4">
        {filtered.map((article) => (
          <Link key={article._id} href={`/blog/${article.slug}`} className="block group">
            <GlassCard tilt={false} className="p-5 hover:border-[#C0392B]/40 transition-colors">
              <h3 className="font-display text-lg leading-snug group-hover:text-[#C0392B] transition-colors line-clamp-2 mb-2">
                {article.title}
              </h3>
              {article.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {article.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="font-mono text-[9px] tracking-widest text-[#C0392B] uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <time className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
                {formatDate(article.createdAt)}
              </time>
            </GlassCard>
          </Link>
        ))}
      </div>
    </aside>
  );
}
