// LanguageContext.jsx — Multilingual Support for 12 Languages across NER
import React, { createContext, useContext, useState, useEffect } from 'react';

// Import JSON translations
import as from '../i18n/as.json';
import bn from '../i18n/bn.json';
import mni from '../i18n/mni.json';
import brx from '../i18n/brx.json';
import ne from '../i18n/ne.json';
import kha from '../i18n/kha.json';
import grt from '../i18n/grt.json';
import lus from '../i18n/lus.json';
import trp from '../i18n/trp.json';
import en from '../i18n/en.json';

export const LANGUAGES = [
  { code: 'as', label: 'Assamese', native: 'অসমীয়া', fontClass: 'lang-as' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', fontClass: 'lang-bn' },
  { code: 'mni', label: 'Manipuri (Meitei)', native: 'মৈতৈলোন্', fontClass: 'lang-bn' },
  { code: 'brx', label: 'Bodo', native: 'बड़ो', fontClass: 'lang-hi' },
  { code: 'ne', label: 'Nepali', native: 'नेपाली', fontClass: 'lang-hi' },
  { code: 'kha', label: 'Khasi', native: 'Khasi', fontClass: '' },
  { code: 'grt', label: 'Garo', native: 'A·chik', fontClass: '' },
  { code: 'lus', label: 'Mizo', native: 'Mizo', fontClass: '' },
  { code: 'trp', label: 'Kokborok', native: 'Kokborok', fontClass: '' },
  { code: 'en', label: 'English', native: 'English', fontClass: '' }
];

const TRANSLATIONS = { as, bn, mni, brx, ne, kha, grt, lus, trp, en };

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
