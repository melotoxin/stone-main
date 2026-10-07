import { pieces, rooms, type Piece, type Room } from '../data/gallery';
import { ALL_LOCALES, LOCALES } from '../i18n/locales';
import { prefixLocale } from '../i18n/paths';

export const SITE_NAME = 'St Werkz';
export const FALLBACK_SITE_URL = 'https://thestoneworks.com';
export const SITE_LOCALE = 'en_PK';
export const SITE_LANGUAGE = 'en-PK';
export const OG_IMAGE_PATH = '/gallery/interiors-hotel-reception-enhanced.webp';
export const THEME_COLOR = '#0c0c0c';
export const THEME_BACKGROUND = '#111111';

export const SITE_DESCRIPTION =
  'St Werkz is a Karachi material studio making custom marble, travertine and onyx furniture, objects and architectural stone. Dining tables, coffee tables, sinks and slabs, shown as a gallery — viewings by request.';

export const SITE_KEYWORDS = [
  'St Werkz Karachi',
  'marble furniture Karachi',
  'travertine dining table Pakistan',
  'onyx coffee table',
  'custom marble table Karachi',
  'stone studio Karachi',
  'architectural stone Pakistan',
  'marble slabs Karachi',
  'travertine objects',
  'backlit onyx',
  'Syed Rashid Ali',
  'North Nazimabad stone',
].join(', ');

export function normalizeOrigin(value?: string | null): string {
  const raw = value?.trim() || FALLBACK_SITE_URL;
  return raw.replace(/\/$/, '');
}

export function absoluteUrl(origin: string, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizeOrigin(origin)}${cleanPath}`;
}

export function pieceAlt(piece: Piece, extra?: string): string {
  const base = `${piece.title} in ${piece.material}, made by St Werkz in Karachi`;
  return extra ? `${base}. ${extra}` : base;
}

export function roomKeywords(room: Room): string {
  const bySlug: Record<Room['slug'], string> = {
    marble:
      'marble dining table Karachi, custom dining table marble, marble furniture Pakistan, Ziarat white marble',
    onyx:
      'onyx coffee table, backlit onyx table Karachi, onyx accents, translucent stone Karachi',
    limestone:
      'travertine bowl, travertine dining table, limestone objects, stone home objects Karachi',
    tiles:
      'stone tiles Karachi, natural stone flooring Pakistan, wall cladding tiles, marble tiles',
    slabs:
      'marble slabs Karachi, Nero Marquina slabs, black marble with gold veining Pakistan',
    handicrafts:
      'marble vessel sink, onyx urns, stone vases, handcrafted stone objects Karachi',
  };
  return bySlug[room.slug];
}

export function indexableRoutes(): Array<{ path: string; priority: string; changefreq: 'weekly' | 'monthly' }> {
  return [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/collection', priority: '0.9', changefreq: 'weekly' },
    { path: '/products', priority: '0.9', changefreq: 'monthly' },
    { path: '/atelier', priority: '0.8', changefreq: 'monthly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/estimate', priority: '0.7', changefreq: 'monthly' },
    { path: '/enquire', priority: '0.7', changefreq: 'monthly' },
    { path: '/retailers', priority: '0.5', changefreq: 'monthly' },
    { path: '/retail', priority: '0.8', changefreq: 'monthly' },
    { path: '/architects', priority: '0.7', changefreq: 'monthly' },
    { path: '/interiors', priority: '0.7', changefreq: 'monthly' },
    { path: '/export', priority: '0.6', changefreq: 'monthly' },
    { path: '/stones', priority: '0.8', changefreq: 'monthly' },
    ...rooms.map((room) => ({
      path: `/collection/${room.slug}`,
      priority: '0.8' as const,
      changefreq: 'monthly' as const,
    })),
    ...pieces.map((piece) => ({
      path: `/collection/${piece.room}/${piece.slug}`,
      priority: '0.7' as const,
      changefreq: 'monthly' as const,
    })),
  ];
}

export function renderRobotsTxt(origin: string): string {
  const host = normalizeOrigin(origin);
  return `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Disallow: /404

Sitemap: ${host}/sitemap.xml
Host: ${host}
`;
}

export function renderSitemapXml(origin: string, lastmod = new Date().toISOString().slice(0, 10)): string {
  const host = normalizeOrigin(origin);
  const urls = indexableRoutes()
    .flatMap((route) =>
      ALL_LOCALES.map((locale) => {
        const loc = prefixLocale(route.path, locale);
        const alternates = [
          ...ALL_LOCALES.map(
            (alt) =>
              `    <xhtml:link rel="alternate" hreflang="${LOCALES[alt].hreflang}" href="${absoluteUrl(host, prefixLocale(route.path, alt))}" />`,
          ),
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(host, route.path)}" />`,
        ].join('\n');
        return `  <url>
    <loc>${absoluteUrl(host, loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${locale === 'en' ? route.priority : String(Math.max(0.4, Number(route.priority) - 0.1))}</priority>
${alternates}
  </url>`;
      }),
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

export function renderWebManifest(): string {
  return `${JSON.stringify(
    {
      id: '/',
      name: 'St Werkz',
      short_name: 'St Werkz',
      description: SITE_DESCRIPTION,
      start_url: '/',
      scope: '/',
      display: 'standalone',
      display_override: ['standalone', 'browser'],
      orientation: 'portrait-primary',
      background_color: THEME_BACKGROUND,
      theme_color: THEME_COLOR,
      lang: SITE_LANGUAGE,
      dir: 'ltr',
      categories: ['lifestyle', 'shopping'],
      icons: [
        {
          src: '/favicon.svg',
          type: 'image/svg+xml',
          sizes: 'any',
          purpose: 'any',
        },
        {
          src: '/icons/icon-192.png',
          type: 'image/png',
          sizes: '192x192',
          purpose: 'any',
        },
        {
          src: '/icons/icon-512.png',
          type: 'image/png',
          sizes: '512x512',
          purpose: 'any',
        },
        {
          src: '/icons/icon-512-maskable.png',
          type: 'image/png',
          sizes: '512x512',
          purpose: 'maskable',
        },
      ],
    },
    null,
    2,
  )}\n`;
}
