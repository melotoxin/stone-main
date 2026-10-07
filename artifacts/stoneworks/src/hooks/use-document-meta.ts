import { useEffect } from 'react';
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  SITE_NAME,
  STUDIO_GEO,
} from '@/lib/site';
import { ALL_LOCALES, LOCALES, getCatalog, prefixLocale, stripLocalePath, type LocaleCode } from '@/i18n';

export type DocumentMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article' | 'product';
  robots?: string;
  keywords?: string;
  locale?: LocaleCode;
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertTypedAlternate(type: string, href: string, title?: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][type="${type}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('type', type);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  if (title) el.setAttribute('title', title);
}

function syncHreflang(barePath: string) {
  document.head.querySelectorAll('link[data-i18n-hreflang]').forEach((el) => el.remove());
  for (const loc of ALL_LOCALES) {
    const el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', LOCALES[loc].hreflang);
    el.setAttribute('href', absoluteUrl(prefixLocale(barePath, loc)));
    el.setAttribute('data-i18n-hreflang', loc);
    document.head.appendChild(el);
  }
  const def = document.createElement('link');
  def.setAttribute('rel', 'alternate');
  def.setAttribute('hreflang', 'x-default');
  def.setAttribute('href', absoluteUrl(barePath));
  def.setAttribute('data-i18n-hreflang', 'x-default');
  document.head.appendChild(def);
}

function syncOgLocales(locale: LocaleCode) {
  document.head.querySelectorAll('meta[data-i18n-og-alt]').forEach((el) => el.remove());
  for (const loc of ALL_LOCALES) {
    if (loc === locale) continue;
    const el = document.createElement('meta');
    el.setAttribute('property', 'og:locale:alternate');
    el.setAttribute('content', LOCALES[loc].ogLocale);
    el.setAttribute('data-i18n-og-alt', loc);
    document.head.appendChild(el);
  }
}

export function useDocumentMeta({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  type = 'website',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  keywords,
  locale = 'en',
}: DocumentMetaInput) {
  useEffect(() => {
    const def = LOCALES[locale];
    const catalog = getCatalog(locale);
    const bare = stripLocalePath(path || '/');
    const canonical = absoluteUrl(prefixLocale(bare, locale));
    const imageUrl = absoluteUrl(image);
    const resolvedAlt = imageAlt || catalog.seo.ogImageAlt || DEFAULT_OG_IMAGE_ALT;
    const resolvedKeywords = keywords || catalog.seo.keywords;

    document.title = title;
    document.documentElement.lang = def.htmlLang;
    document.documentElement.dir = def.dir;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', resolvedKeywords);
    upsertMeta('name', 'robots', robots);
    upsertMeta('name', 'author', 'Syed Rashid Ali, St Werkz');
    upsertMeta('name', 'citation_author', 'Syed Rashid Ali');
    upsertMeta('name', 'citation_title', title);
    upsertMeta('name', 'citation_publication_date', '2026-09-04');
    upsertMeta('name', 'theme-color', '#0c0c0c');
    upsertMeta('name', 'geo.region', 'PK-SD');
    upsertMeta('name', 'geo.placename', 'North Nazimabad, Karachi');
    upsertMeta('name', 'geo.position', `${STUDIO_GEO.latitude};${STUDIO_GEO.longitude}`);
    upsertMeta('name', 'ICBM', `${STUDIO_GEO.latitude}, ${STUDIO_GEO.longitude}`);
    upsertCanonical(canonical);
    upsertTypedAlternate('text/plain', absoluteUrl('/llms.txt'), 'LLM brief');
    upsertTypedAlternate('application/ld+json', absoluteUrl('/knowledge.json'), 'St Werkz knowledge graph');
    syncHreflang(bare);

    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', def.ogLocale);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:alt', resolvedAlt);
    syncOgLocales(locale);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);
    upsertMeta('name', 'twitter:image:alt', resolvedAlt);
  }, [title, description, path, image, imageAlt, type, robots, keywords, locale]);
}
