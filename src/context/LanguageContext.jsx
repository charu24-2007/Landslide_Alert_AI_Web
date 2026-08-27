// LanguageContext.jsx — Multilingual Support for 12 Languages across NER
import React, { createContext, useContext, useState, useEffect } from 'react';

// Import JSON translations
import en from '../i18n/en.json';
import hi from '../i18n/hi.json';
import as from '../i18n/as.json';
import bn from '../i18n/bn.json';
import ta from '../i18n/ta.json';
import te from '../i18n/te.json';
import ml from '../i18n/ml.json';
import kn from '../i18n/kn.json';
import mr from '../i18n/mr.json';
import gu from '../i18n/gu.json';
import or from '../i18n/or.json';
import ne from '../i18n/ne.json';

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English', fontClass: '' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', fontClass: 'lang-hi' },
  { code: 'as', label: 'Assamese', native: 'অসমীয়া', fontClass: 'lang-as' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', fontClass: 'lang-bn' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', fontClass: 'lang-ta' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', fontClass: 'lang-te' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', fontClass: 'lang-ml' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', fontClass: 'lang-kn' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', fontClass: 'lang-hi' }, // uses Devanagari font style
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', fontClass: 'lang-gu' },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ', fontClass: 'lang-or' },
  { code: 'ne', label: 'Nepali', native: 'नेपाली', fontClass: 'lang-hi' }  // uses Devanagari font style
];

const TRANSLATIONS = { en, hi, as, bn, ta, te, ml, kn, mr, gu, or, ne };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('lsa_lang');
    if (saved && TRANSLATIONS[saved]) {
      setLang(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const changeLanguage = (code) => {
    if (TRANSLATIONS[code]) {
      setLang(code);
      localStorage.setItem('lsa_lang', code);
      document.documentElement.lang = code;
    }
  };

  const t = (key) => {
    if (!key) return '';
    const currentDict = TRANSLATIONS[lang] || TRANSLATIONS.en;
    
    // 1. Direct key match in current language
    if (currentDict[key]) return currentDict[key];
    
    // 2. Direct key match in English
    if (TRANSLATIONS.en[key]) return TRANSLATIONS.en[key];

    // 3. Dynamic pattern translation for relative time strings (e.g. "12 min ago", "26 min ago", "1 hr ago", "Just now")
    if (typeof key === 'string') {
      const minMatch = key.match(/^(\d+)\s*min\s*ago$/i);
      if (minMatch) {
        const num = minMatch[1];
        const minText = currentDict['minAgo'] || 'min ago';
        return `${num} ${minText}`;
      }
      const hrMatch = key.match(/^(\d+)\s*hr\s*ago$/i);
      if (hrMatch) {
        const num = hrMatch[1];
        const hrText = currentDict['hrAgo'] || 'hr ago';
        return `${num} ${hrText}`;
      }
      if (key.toLowerCase() === 'just now') {
        return currentDict['justNow'] || 'Just now';
      }
    }

    return key;
  };

  const currentLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, LANGUAGES, currentLangObj }}>
      <div className={currentLangObj.fontClass} style={{ width: '100%', minHeight: '100vh' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
