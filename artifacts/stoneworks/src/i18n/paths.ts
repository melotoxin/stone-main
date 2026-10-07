import { isPrefixedLocale, LOCALE_PREFIX_RE, type LocaleCode } from './locales';

export function stripLocalePath(pathname: string): string {
  const raw = pathname.trim() || '/';
  const noTrailing = raw.length > 1 ? raw.replace(/\/$/, '') : raw;
  const match = noTrailing.match(LOCALE_PREFIX_RE);
  if (!match) return noTrailing.startsWith('/') ? noTrailing : `/${noTrailing}`;
  const rest = noTrailing.slice(match[0].length);
  return rest || '/';
}

export function localeFromPath(pathname: string): LocaleCode {
  const match = pathname.match(LOCALE_PREFIX_RE);
  if (match && isPrefixedLocale(match[1])) return match[1];
  return 'en';
}

export function prefixLocale(barePath: string, locale: LocaleCode): string {
  const path = barePath.startsWith('/') ? barePath : `/${barePath}`;
  const normalised = path === '' ? '/' : path;
  if (locale === 'en') return normalised;
  if (normalised === '/') return `/${locale}`;
  return `/${locale}${normalised}`;
}

export function splitHref(href: string): { path: string; search: string; hash: string } {
  const hashIndex = href.indexOf('#');
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const qIndex = withoutHash.indexOf('?');
  const search = qIndex >= 0 ? withoutHash.slice(qIndex) : '';
  const path = qIndex >= 0 ? withoutHash.slice(0, qIndex) : withoutHash;
  return { path, search, hash };
}

export function localizeHref(href: string, locale: LocaleCode): string {
  if (!href) return href;
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  if (href.startsWith('#')) return href;
  if (href.startsWith('~')) return href.slice(1);

  const { path, search, hash } = splitHref(href);
  const bare = stripLocalePath(path || '/');
  return `${prefixLocale(bare, locale)}${search}${hash}`;
}

export function switchLocaleHref(currentPath: string, search: string, next: LocaleCode, hash = ''): string {
  const bare = stripLocalePath(currentPath);
  const query = search
    ? search.startsWith('?')
      ? search
      : `?${search}`
    : '';
  const fragment = hash ? hash.startsWith('#') ? hash : `#${hash}` : '';
  return `${prefixLocale(bare, next)}${query}${fragment}`;
}

export const LOCALE_ROUTE = '/:locale(es|it|fr|ar|ur|ru)';
