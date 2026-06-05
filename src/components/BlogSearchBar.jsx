'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BlogSearchBar() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('search') || '');
  const timerRef = useRef(null);

  useEffect(() => {
    setValue(searchParams.get('search') || '');
  }, [searchParams]);

  const update = (search) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (search) params.set('search', search); else params.delete('search');
      params.set('page', '1');
      router.push(`/blog?${params.toString()}`);
    }, 300);
  };

  const clear = () => {
    setValue('');
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    params.set('page', '1');
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="relative">
      <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
      <input
        type="search"
        placeholder={t('blog.searchPlaceholder')}
        value={value}
        onChange={(e) => { setValue(e.target.value); update(e.target.value); }}
        className="w-full glass rounded-full pl-10 pr-10 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:ring-1 focus:ring-[#C0392B]/50 transition"
      />
      {value && (
        <button onClick={clear} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition" aria-label="Clear search">
          <X size={14} />
        </button>
      )}
    </div>
  );
}
