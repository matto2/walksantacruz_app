/**
 * Language utilities for Walk Santa Cruz
 */

export const SUPPORTED_LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  'zh-CN': { code: 'zh-CN', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  ja: { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' }
} as const;

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES;

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export function getLanguageFromStorage(): LanguageCode {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

  const stored = localStorage.getItem('preferred-language');
  if (stored && stored in SUPPORTED_LANGUAGES) {
    return stored as LanguageCode;
  }

  return DEFAULT_LANGUAGE;
}

export function setLanguageInStorage(lang: LanguageCode): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('preferred-language', lang);
}

export function getLanguageInfo(code: LanguageCode) {
  return SUPPORTED_LANGUAGES[code] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
}
