export const LOCALE_PREF_KEY = 'stoneworks.locale';
export const LOCALE_HINT_KEY = 'stoneworks.locale.hint';

export const CONTENT_LOCALES = ['es', 'it', 'fr', 'ar', 'ur', 'ru'] as const;
export const ALL_LOCALES = ['en', ...CONTENT_LOCALES] as const;

export type LocaleCode = (typeof ALL_LOCALES)[number];
export type PrefixedLocale = (typeof CONTENT_LOCALES)[number];

export type LocaleDefinition = {
  code: LocaleCode;
  htmlLang: string;
  ogLocale: string;
  hreflang: string;
  dir: 'ltr' | 'rtl';
  nativeName: string;
  englishName: string;
  /** BCP 47 prefixes that should suggest this locale to a first-time visitor. */
  browser: string[];
};

export const LOCALES: Record<LocaleCode, LocaleDefinition> = {
  en: {
    code: 'en',
    htmlLang: 'en-PK',
    ogLocale: 'en_PK',
    hreflang: 'en-PK',
    dir: 'ltr',
    nativeName: 'English',
    englishName: 'English',
    browser: ['en'],
  },
  es: {
    code: 'es',
    htmlLang: 'es',
    ogLocale: 'es_ES',
    hreflang: 'es',
    dir: 'ltr',
    nativeName: 'Español',
    englishName: 'Spanish',
    browser: ['es'],
  },
  it: {
    code: 'it',
    htmlLang: 'it',
    ogLocale: 'it_IT',
    hreflang: 'it',
    dir: 'ltr',
    nativeName: 'Italiano',
    englishName: 'Italian',
    browser: ['it'],
  },
  fr: {
    code: 'fr',
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
    hreflang: 'fr',
    dir: 'ltr',
    nativeName: 'Français',
    englishName: 'French',
    browser: ['fr'],
  },
  ar: {
    code: 'ar',
    htmlLang: 'ar',
    ogLocale: 'ar_SA',
    hreflang: 'ar',
    dir: 'rtl',
    nativeName: 'العربية',
    englishName: 'Arabic',
    browser: ['ar'],
  },
  ur: {
    code: 'ur',
    htmlLang: 'ur-PK',
    ogLocale: 'ur_PK',
    hreflang: 'ur',
    dir: 'rtl',
    nativeName: 'اردو',
    englishName: 'Urdu',
    browser: ['ur'],
  },
  ru: {
    code: 'ru',
    htmlLang: 'ru',
    ogLocale: 'ru_RU',
    hreflang: 'ru',
    dir: 'ltr',
    nativeName: 'Русский',
    englishName: 'Russian',
    browser: ['ru'],
  },
};

export const LOCALE_PREFIX_RE = /^\/(es|it|fr|ar|ur|ru)(?=\/|$)/;

export function isLocaleCode(value: string | undefined | null): value is LocaleCode {
  return value != null && (ALL_LOCALES as readonly string[]).includes(value);
}

export function isPrefixedLocale(value: string | undefined | null): value is PrefixedLocale {
  return value != null && (CONTENT_LOCALES as readonly string[]).includes(value);
}

export function suggestLocaleFromBrowser(language: string | undefined): PrefixedLocale | null {
  if (!language) return null;
  const lower = language.toLowerCase();
  for (const code of CONTENT_LOCALES) {
    if (LOCALES[code].browser.some((prefix) => lower === prefix || lower.startsWith(`${prefix}-`))) {
      return code;
    }
  }
  return null;
}
