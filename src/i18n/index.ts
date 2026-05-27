import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import sl from './locales/sl.json';
import en from './locales/en.json';
import it from './locales/it.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      sl: { translation: sl },
      en: { translation: en },
      it: { translation: it },
    },
    fallbackLng: 'sl',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
