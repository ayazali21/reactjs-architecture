import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '@/locales/en/translation.json';
import ar from '@/locales/ar/translation.json';

export const RTL_LOCALES = new Set(['ar', 'he', 'fa', 'ur']);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    interpolation: { escapeValue: false },
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = RTL_LOCALES.has(lng) ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

// set dir/lang correctly on first load, not just on subsequent changes
const initialLng = i18n.resolvedLanguage ?? 'en';
document.documentElement.dir = RTL_LOCALES.has(initialLng) ? 'rtl' : 'ltr';
document.documentElement.lang = initialLng;

export default i18n;