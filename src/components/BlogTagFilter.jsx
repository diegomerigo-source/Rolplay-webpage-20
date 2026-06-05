'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/cn';

export default function BlogTagFilter({ tags }) {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get('tags');

  const navigate = (tag) => {
    const params = new URLSearchParams(searchParams);
    if (tag) { if (selected === tag) params.delete('tags'); else params.set('tags', tag); }
    else params.delete('tags');
    params.set('page', '1');
    router.push(`/blog?${params.toString()}`);
  };

  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => navigate(null)}
        className={cn('rounded-full px-3 py-1 text-[10px] font-mono tracking-widest uppercase transition',
          !selected ? 'bg-[#C0392B] text-white' : 'glass text-zinc-400 hover:text-white')}
      >
        {t('blog.allTags')}
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => navigate(tag)}
          className={cn('rounded-full px-3 py-1 text-[10px] font-mono tracking-widest uppercase transition',
            selected === tag ? 'bg-[#C0392B] text-white' : 'glass text-zinc-400 hover:text-white')}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
