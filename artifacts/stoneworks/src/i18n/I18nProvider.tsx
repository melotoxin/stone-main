import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'wouter';
import { catalogs } from './catalogs';
import { I18nContext, type I18nValue } from './i18n-context';
import { LOCALES, LOCALE_PREF_KEY } from './locales';
import { localeFromPath, localizeHref, prefixLocale, stripLocalePath } from './paths';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const locale = localeFromPath(location);

  useEffect(() => {
    document.documentElement.lang = LOCALES[locale].htmlLang;
    document.documentElement.dir = LOCALES[locale].dir;
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  useEffect(() => {
    if (locale === 'en') return;
    try {
      window.localStorage.setItem(LOCALE_PREF_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const value: I18nValue = {
    locale,
    dir: LOCALES[locale].dir,
    t: catalogs[locale],
    href: (path) => localizeHref(path, locale),
    barePath: stripLocalePath(location),
    prefix: (path) => prefixLocale(path, locale),
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
