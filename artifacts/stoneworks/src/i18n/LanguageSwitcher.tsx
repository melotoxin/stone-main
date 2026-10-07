import { useState, useSyncExternalStore } from 'react';
import { Link as WouterLink, useSearch } from 'wouter';
import { ChevronDown } from 'lucide-react';
import { ALL_LOCALES, LOCALES, LOCALE_PREF_KEY, type LocaleCode } from './locales';
import { switchLocaleHref } from './paths';
import { useI18n } from './use-i18n';

const hashNavigationEvents = ['hashchange', 'popstate', 'pushState', 'replaceState'];
const currentHash = () => window.location.hash;
const serverHash = () => '';
function subscribeHash(onChange: () => void) {
  hashNavigationEvents.forEach(event => window.addEventListener(event, onChange));
  return () => hashNavigationEvents.forEach(event => window.removeEventListener(event, onChange));
}

export function LanguageSwitcher({
  variant = 'header',
}: {
  variant?: 'header' | 'menu' | 'footer' | 'hero';
}) {
  const search = useSearch();
  const hash = useSyncExternalStore(subscribeHash, currentHash, serverHash);
  const { locale, t, barePath } = useI18n();
  const [open, setOpen] = useState(false);

  const choose = (next: LocaleCode) => {
    try {
      window.localStorage.setItem(LOCALE_PREF_KEY, next);
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const links = (tap: 'hero' | 'menu' | 'compact') =>
    ALL_LOCALES.map((code) => {
      const href = switchLocaleHref(barePath, search, code, hash);
      const current = code === locale;
      const testId =
        variant === 'hero'
          ? `link-home-locale-${code}`
          : variant === 'header'
            ? `link-locale-${code}`
            : `link-locale-${variant}-${code}`;
      const tapClass =
        tap === 'hero'
          ? 'inline-flex min-h-11 items-center sm:min-h-0'
          : tap === 'menu'
            ? 'inline-flex min-h-11 items-center'
            : 'inline-flex min-h-11 items-center py-1';
      return (
        <WouterLink
          key={code}
          href={`~${href}`}
          onClick={() => choose(code)}
          className={`touch-manipulation text-[11px] uppercase tracking-[.14em] sm:text-[10px] sm:tracking-[.16em] ${tapClass} ${
            variant === 'footer'
              ? current ? 'text-[#f3eee5]' : 'text-[#b9afa1] hover:text-[#f3eee5]'
              : current ? 'opacity-100' : 'opacity-55 hover:opacity-100'
          }`}
          aria-current={current ? 'true' : undefined}
          lang={LOCALES[code].htmlLang}
          hrefLang={LOCALES[code].hreflang}
          data-testid={testId}
        >
          {LOCALES[code].nativeName}
        </WouterLink>
      );
    });

  if (variant === 'hero') {
    return (
      <div data-testid="home-language-selector">
        <p className="font-monoish text-[10px] text-current/50">{t.chrome.languages}</p>
        <nav
          aria-label={t.chrome.languages}
          className="mt-3 grid grid-cols-2 gap-x-4 gap-y-0 sm:flex sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2"
        >
          {links('hero')}
        </nav>
      </div>
    );
  }

  if (variant === 'header') {
    return (
      <div className="relative" data-testid="header-language-selector">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center gap-1.5 px-1 text-[11px] uppercase tracking-[.16em] opacity-80 hover:opacity-100 sm:min-h-0 sm:min-w-0 sm:text-[10px]"
          aria-expanded={open}
          aria-controls={open ? 'header-language-options' : undefined}
          aria-label={`${LOCALES[locale].nativeName} — ${t.chrome.languages}`}
          onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}
          data-testid="button-language-selector"
        >
          <span lang={LOCALES[locale].htmlLang}>{LOCALES[locale].nativeName}</span>
          <ChevronDown size={12} strokeWidth={1.5} className={open ? 'rotate-180' : undefined} />
        </button>
        {open ? (
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setOpen(false)} aria-hidden="true" />
            <nav
              id="header-language-options"
              aria-label={t.chrome.languages}
              onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}
              className="absolute end-0 top-full z-[70] mt-2 w-[min(16rem,calc(100vw-2rem))] border border-current/15 bg-[#0c0c0c] px-4 py-2 text-[#f6f3ec] shadow-lg"
            >
              <div className="flex flex-col">{links('compact')}</div>
            </nav>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <nav
      aria-label={t.chrome.languages}
      className={
        variant === 'footer'
          ? 'flex flex-wrap gap-x-4 gap-y-1'
          : 'flex flex-wrap items-center gap-x-4 gap-y-1'
      }
    >
      {links('menu')}
    </nav>
  );
}
