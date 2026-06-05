'use client';
import { useEffect } from 'react';
import i18n from '../i18n';

export default function I18nProvider({ children }) {
  useEffect(() => {
    // Apply the user's saved language preference after hydration.
    // This runs client-side only, so it never causes a server/client mismatch.
    const saved = localStorage.getItem('i18nextLng');
    if (saved && saved !== i18n.language) {
      i18n.changeLanguage(saved);
    }
  }, []);

  return <>{children}</>;
}
