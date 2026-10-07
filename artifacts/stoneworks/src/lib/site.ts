import { studio, type Piece, type Room } from '@/data/gallery';

/** Production origin for canonicals, sitemap, and OG when `VITE_SITE_URL` is set. */
export const FALLBACK_SITE_ORIGIN = 'https://thestoneworks.com';

export const DEFAULT_OG_IMAGE = '/gallery/interiors-hotel-reception-enhanced.webp';
export const DEFAULT_OG_IMAGE_ALT =
  'Travertine monolith reception desk with a raw-hewn edge in a quiet hotel lobby, by St Werkz Karachi';

export const SITE_NAME = 'St Werkz';
export const SITE_TAGLINE = 'A Karachi stone studio';
export const SITE_DESCRIPTION =
  'St Werkz is a Karachi stone studio making tables, objects and architectural surfaces in travertine, onyx and marble. View the collection or request a viewing.';
export const SITE_KEYWORDS =
  'St Werkz Karachi, marble furniture Karachi, travertine dining table Pakistan, onyx coffee table, custom marble table Karachi, stone studio Karachi, architectural stone Pakistan, marble slabs Karachi, travertine objects, backlit onyx, Pakistani marble names, Ziarat White, green onyx Pakistan, Syed Rashid Ali';

/** Approximate studio coordinates for North Nazimabad, Karachi — neighbourhood-level, not a surveyed pin. */
export const STUDIO_GEO = {
  latitude: 24.934,
  longitude: 67.037,
} as const;

export const business = {
  legalName: 'St Werkz',
  brandName: 'St Werkz',
  alternateNames: ['St Werkz', 'St Werkz Karachi'] as const,
  description:
    'St Werkz is a Karachi stone studio making tables, objects and architectural surfaces in travertine, onyx and marble.',
  areaServed: ['Karachi', 'Pakistan'] as const,
  knowsAbout: [
    'Travertine',
    'Onyx',
    'Marble',
    'Pakistani marble',
    'Pakistani onyx',
    'Stone furniture',
    'Architectural surfaces',
  ] as const,
  founder: studio.name,
  email: studio.email,
  telephone: studio.phoneDisplay,
  telephoneHref: studio.phoneHref,
  address: studio.address,
  streetAddress: 'Suite A-104, First Floor, Bhayani Shopping Centre, Block-M',
  addressLocality: 'North Nazimabad',
  addressRegion: 'Sindh',
  addressCountry: 'PK',
} as const;

export function envSiteOrigin(): string | undefined {
  const raw = import.meta.env.VITE_SITE_URL;
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim().replace(/\/$/, '');
  return trimmed || undefined;
}

export function getSiteOrigin(): string {
  return envSiteOrigin() ?? (typeof window !== 'undefined' ? window.location.origin : FALLBACK_SITE_ORIGIN);
}

export function withBasePath(path: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  if (path === '/') return base || '/';
  const normalised = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalised}`;
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const origin = getSiteOrigin();
  const resolved = withBasePath(path);
  if (resolved.startsWith('http')) return resolved;
  return `${origin}${resolved.startsWith('/') ? resolved : `/${resolved}`}`;
}

export function clipMeta(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const sliced = clean.slice(0, max - 1);
  const bound = sliced.lastIndexOf(' ');
  const clipped = sliced.slice(0, bound > 110 ? bound : max - 1);
  return `${clipped.replace(/[.,;: ]+$/, '')}…`;
}

export function titleFor(page: string): string {
  return `${page} — St Werkz, Karachi`;
}

export function pieceImageAlt(piece: Piece, viewIndex?: number): string {
  const material = piece.material.charAt(0).toLowerCase() + piece.material.slice(1);
  const base = `${piece.title} in ${material}`;
  if (viewIndex != null && viewIndex > 0) return `${base}, view ${viewIndex + 1}`;
  return base;
}

export function pieceDescription(piece: Piece, room: Room): string {
  return clipMeta(
    `${piece.title} in ${piece.material}. ${piece.form}. From the ${room.title} room at St Werkz, a Karachi stone studio.`,
  );
}

export const staticMeta = {
  home: {
    title: 'St Werkz, Karachi — Stone studio for tables, objects and surfaces',
    description:
      'St Werkz is a Karachi stone studio making tables, objects and architectural surfaces in travertine, onyx and marble. View the collection or request a viewing.',
    path: '/',
  },
  collection: {
    title: titleFor('The Collection'),
    description:
      'Walk five rooms of St Werkz stone — dining, living, accents, interiors and slabs — hung like a gallery in Karachi. No prices on the wall; request a viewing.',
    path: '/collection',
  },
  atelier: {
    title: titleFor('Atelier'),
    description:
      'St Werkz is a Karachi material studio led by Syed Rashid Ali. Travertine, onyx and marble furniture, from a first conversation to a lasting surface.',
    path: '/atelier',
  },
  about: {
    title: titleFor('About'),
    description:
      'St Werkz is a Karachi material studio. Stone sourced for scale, sculpted for one — retail handicrafts, architects and interior designers, and wholesale export. Studio in Karachi; desks in New York, Barcelona, Kuala Lumpur and Dubai.',
    path: '/about',
  },
  enquire: {
    title: titleFor('Request a Viewing'),
    description:
      'Request a St Werkz viewing in Karachi. Write stoneworks014@gmail.com or call +92 304 7689678. Name a work or the room — a studio conversation, not a cart.',
    path: '/enquire',
  },
  estimate: {
    title: titleFor('Studio Estimate'),
    description:
      'A first St Werkz range in PKR before the slab — indicative, not a price. Describe the piece, stone and size. Syed Rashid Ali confirms the stone in Karachi.',
    path: '/estimate',
  },
  retailers: {
    title: titleFor('For Retailers'),
    description:
      'A St Werkz edit of marble, onyx and travertine objects for retailers. Trade conversations with the Karachi studio — collected shelves, not a warehouse.',
    path: '/retailers',
  },
  retail: {
    title: titleFor('Retail Store'),
    description:
      'Handcrafted onyx and marble objects for the home from St Werkz, Karachi — bowls, urns and tables shown as a gallery. Walk the rooms, then request a viewing.',
    path: '/retail',
  },
  architects: {
    title: titleFor('Architect'),
    description:
      'Material support from St Werkz for architects in Karachi — samples, stone furniture, slabs and surfaces specified with intention.',
    path: '/architects',
  },
  interiors: {
    title: titleFor('Interior Design'),
    description:
      'Objects and slabs for interior designers from St Werkz, Karachi — handcrafted pieces and architectural surfaces for furnished rooms. Talk through a project.',
    path: '/interiors',
  },
  export: {
    title: titleFor('Export desk'),
    description:
      'Photographed marble, onyx and travertine lots from the St Werkz yard in Karachi. A sample crate before a container. FOB Karachi; no published price list.',
    path: '/export',
  },
  stones: {
    title: titleFor('Pakistan marble and onyx'),
    description:
      'Named Pakistani marbles and onyx with high-resolution pattern photographs for identification — Ziarat White, Sunny Grey, Tavera, Black and Gold, green and honey onyx — plus September 2026 indicative PKR rates per square foot.',
    path: '/stones',
  },
  notFound: {
    title: titleFor('Page not found'),
    description:
      'This St Werkz page is not on view. Return to the Karachi collection of stone tables, objects and surfaces, or request a viewing.',
    path: '',
    robots: 'noindex, follow',
  },
} as const;

export const roomMeta: Record<Room['slug'], { description: string }> = {
  marble: {
    description:
      'Premium marble surfaces and furniture from St Werkz, Karachi — beautifully crafted dining tables, architectural surfaces and accessories.',
  },
  onyx: {
    description:
      'Translucent and captivating onyx from St Werkz, Karachi — backlit slabs, statement tables and breathtaking accents.',
  },
  limestone: {
    description:
      'Natural and timeless limestone from St Werkz, Karachi — warm, organic aesthetic for modern and classic designs, including travertine objects.',
  },
  tiles: {
    description:
      'High-quality natural stone tiles for flooring and wall cladding from St Werkz, Karachi — ensuring a sophisticated finish for any space.',
  },
  slabs: {
    description:
      'Large format natural stone slabs from the St Werkz yard in Karachi — ready to be transformed into bespoke architectural elements and countertops.',
  },
  handicrafts: {
    description:
      'Beautifully crafted stone handicrafts and accents from St Werkz, Karachi — vases, bowls, and intricate bath sets in marble and onyx.',
  },
};
