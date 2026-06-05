import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

// LanguageDetector is intentionally NOT used here.
// Reading localStorage during module initialisation causes a server/client
// mismatch: the server renders with the fallback ("en") while the client
// hydrates with the saved locale — triggering a React hydration error.
// Instead, I18nProvider applies the saved language in a useEffect that
// runs only after hydration has completed (see src/components/I18nProvider.jsx).
i18n
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, es: { translation: es } },
    lng: 'en',           // stable initial language — same on server and client
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
