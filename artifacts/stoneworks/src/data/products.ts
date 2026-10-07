import { pieces, type Piece } from './gallery';
import { originalCatalogImage } from './editorial-media';
import type { SpaceId } from './room-scenes';

export type ProductChapter = {
  id: SpaceId;
  number: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  material: string;
  mood: 'warm' | 'light' | 'dark';
  heroImage: string;
  heroAlt: string;
  detailImage: string;
  featuredSlug: string;
  pieces: Piece[];
};

/** These catalog originals were verified against the existing public/gallery files. */
export function originalProductImage(image: string): string {
  return originalCatalogImage(image);
}

export function productChapterFromHash(hash: string): SpaceId | undefined {
  const id = hash.replace(/^#/, '');
  if (id === 'bathroom') return 'washroom';
  if (id === 'handicrafts') return 'home-decor';
  return id === 'kitchen' || id === 'washroom' || id === 'home-decor' ? id : undefined;
}

// Reuse the catalogue records so product names, materials and detail links stay in sync.
function selectPieces(slugs: string[]): Piece[] {
  return slugs.map((slug) => {
    const piece = pieces.find((item) => item.slug === slug);
    if (!piece) throw new Error(`Missing product chapter piece: ${slug}`);
    return { ...piece, images: piece.images.map(originalProductImage) };
  });
}

export const productChapters: ProductChapter[] = [
  {
    id: 'kitchen',
    number: '01',
    label: 'Kitchen accessories',
    title: 'Gather around stone.',
    subtitle: 'Small rituals. Extraordinary objects.',
    description: 'A sculptural bowl at the centre of the table. A tray that brings the little things together. Explore bowls, trays, coasters and canisters in natural travertine, onyx and polished marble.',
    material: 'Travertine, onyx & marble',
    mood: 'warm',
    heroImage: '/gallery/st-werkz/travertine-compote.jpg',
    heroAlt: 'Wide beige travertine pedestal bowl with a hemispherical foot, photographed beside shells',
    detailImage: '/gallery/st-werkz/sage-onyx-coasters-a.jpg',
    featuredSlug: 'travertine-compote',
    pieces: selectPieces([
      'travertine-compote',
      'travertine-tray',
      'oblong-tray',
      'round-tray',
      'coaster-suite',
      'sage-onyx-coasters',
      'curved-canisters',
      'pedestal-bowl',
      'sage-onyx-pear-bowl',
      'scalloped-onyx-bowl',
      'nero-disc-tray',
    ]),
  },
  {
    id: 'washroom',
    number: '02',
    label: 'Washroom accessories',
    title: 'A quieter kind of luxury.',
    subtitle: 'Your everyday sanctuary, carved in stone.',
    description: 'From a polished marble basin to a carefully composed vanity set, natural stone makes a daily routine feel considered. Discover dispensers, vanity cups, soap dishes and complete bath ensembles, alongside decorative vessels for a shelf or counter.',
    material: 'Marble & travertine',
    mood: 'light',
    heroImage: '/gallery/st-werkz/portoro-bath-set.jpg',
    heroAlt: 'Black and gold Portoro marble bath set with a dispenser, tissue cover, cup, lidded jar and soap dish',
    detailImage: '/gallery/st-werkz/travertine-vanity-gold.jpg',
    featuredSlug: 'portoro-bath-set',
    pieces: selectPieces([
      'portoro-bath-set',
      'travertine-vanity-gold',
      'travertine-bath-ensemble',
      'travertine-bath-seven',
      'travertine-bath',
      'vessel-sink',
      'copper-vein-basin',
      'coral-canister',
      'scalloped-valet',
      'portoro-cylinder-cup',
      'nero-cylinder',
      'tapered-vessel',
    ]),
  },
  {
    id: 'home-decor',
    number: '03',
    label: 'Room & home decor accessories',
    title: 'Make yourself at home.',
    subtitle: 'A little character. A place of your own.',
    description: 'A statement vase on the console. Candle holders beside your favourite chair. A carved chess set ready for a slow evening. Explore vases, bookends, desk objects, display pedestals and compact side tables that bring warmth and character to your home.',
    material: 'Onyx, marble & travertine',
    mood: 'dark',
    heroImage: '/gallery/st-werkz/banded-onyx-vase.jpg',
    heroAlt: 'Polished banded onyx vase with a flared rim and natural amber, rust, cream and sage layers',
    detailImage: '/gallery/st-werkz/nero-chess-set.jpg',
    featuredSlug: 'banded-onyx-vase',
    pieces: selectPieces([
      'banded-onyx-vase',
      'portoro-baluster-vase',
      'terracotta-marble-urn',
      'live-edge-onyx-vessel',
      'onyx-chess-casket',
      'nero-chess-set',
      'travertine-candlesticks',
      'bulbous-vessel',
      'portoro-bookends',
      'desk-suite',
      'nero-candles',
      'hemisphere-candle',
      'onyx-urns',
      'tall-noir-vase',
      'pair-stone-pedestals',
      'travertine-drum-side',
      'travertine-cone-pedestal',
      'travertine-c-table',
    ]),
  },
];
