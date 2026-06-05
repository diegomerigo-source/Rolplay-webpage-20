'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function BlogPagination({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const go = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    router.push(`/blog?${params.toString()}`);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) pages.push(i);
    else if (pages[pages.length - 1] !== '...') pages.push('...');
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      <button onClick={() => go(currentPage - 1)} disabled={currentPage === 1}
        className={cn('w-10 h-10 rounded-full grid place-items-center glass transition', currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'text-zinc-400 hover:text-white')}
        aria-label="Previous page">
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, i) =>
        typeof page === 'string'
          ? <span key={`e-${i}`} className="w-10 h-10 flex items-center justify-center text-zinc-600 font-mono text-xs">…</span>
          : <button key={page} onClick={() => go(page)}
              className={cn('w-10 h-10 rounded-full font-mono text-xs transition',
                page === currentPage ? 'bg-[#C0392B] text-white' : 'glass text-zinc-400 hover:text-white')}
              aria-current={page === currentPage ? 'page' : undefined}>
              {page}
            </button>
      )}

      <button onClick={() => go(currentPage + 1)} disabled={currentPage === totalPages}
        className={cn('w-10 h-10 rounded-full grid place-items-center glass transition', currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'text-zinc-400 hover:text-white')}
        aria-label="Next page">
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
