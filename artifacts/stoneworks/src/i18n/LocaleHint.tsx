import { useEffect, useState } from 'react';
import { Link as WouterLink, useSearch } from 'wouter';
import { catalogs } from './catalogs';
import { LOCALE_HINT_KEY, LOCALE_PREF_KEY, LOCALES, suggestLocaleFromBrowser, type PrefixedLocale } from './locales';
import { switchLocaleHref } from './paths';
import { useI18n } from './use-i18n';


export function LocaleHint() {
  const { locale, t, barePath } = useI18n();
  const search = useSearch();
  const [suggested, setSuggested] = useState<PrefixedLocale | null>(null);

  useEffect(() => {
    if (locale !== 'en') return;
    try {
      if (window.localStorage.getItem(LOCALE_HINT_KEY)) return;
      if (window.localStorage.getItem(LOCALE_PREF_KEY)) return;
      const match = suggestLocaleFromBrowser(navigator.language || navigator.languages?.[0]);
      if (match) setSuggested(match);
    } catch {
      /* ignore */
    }
  }, [locale]);

  if (!suggested) return null;

  const copy = catalogs[suggested];
  const native = LOCALES[suggested].nativeName;
  const href = switchLocaleHref(barePath, search, suggested);

  const dismiss = () => {
    try {
      window.localStorage.setItem(LOCALE_HINT_KEY, suggested);
    } catch {
      /* ignore */
    }
    setSuggested(null);
  };

  const accept = () => {
    try {
      window.localStorage.setItem(LOCALE_PREF_KEY, suggested);
      window.localStorage.setItem(LOCALE_HINT_KEY, suggested);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 z-[70] mx-auto max-w-lg border border-white/15 bg-[#151515]/95 px-4 py-3 text-[#f6f3ec] shadow-md backdrop-blur-md sm:left-auto sm:right-6"
      role="region"
      aria-label={t.chrome.languages}
      data-testid="locale-hint"
    >
      <p className="text-sm leading-6">{copy.hint.message}</p>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[.16em]">
        <WouterLink href={`~${href}`} onClick={accept} className="line-link font-semibold" data-testid="link-locale-hint-accept">
          {copy.hint.action.replace('{language}', native)}
        </WouterLink>
        <button type="button" onClick={dismiss} className="opacity-60 hover:opacity-100" data-testid="button-locale-hint-dismiss">
          {copy.hint.dismiss}
        </button>
      </div>
    </div>
  );
}
