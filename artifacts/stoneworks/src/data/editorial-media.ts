const framedPhotos: Record<string, string> = {
  '/gallery/accents-bulbous-vessel.jpg': '/gallery/clean/accents-bulbous-vessel.svg',
  '/gallery/accents-travertine-candlesticks.jpg': '/gallery/clean/accents-travertine-candlesticks.svg',
  '/gallery/accents-tapered-vessel.jpg': '/gallery/clean/accents-tapered-vessel.svg',
  '/gallery/accents-round-tray.jpg': '/gallery/clean/accents-round-tray.svg',
  '/gallery/accents-curved-canisters.jpg': '/gallery/clean/accents-curved-canisters.svg',
  '/gallery/accents-pedestal-bowl.jpg': '/gallery/clean/accents-pedestal-bowl.svg',
};

/** Use original photography, with screenshot controls excluded by a native viewport. */
export function originalCatalogImage(path: string): string {
  const original = path.replace(/-enhanced\.webp(?=\?|$)/, '.jpg');
  const [source, query] = original.split('?');
  return (framedPhotos[source] ?? source) + (query !== undefined ? '?' + query : '');
}

// Distinct editorial roles keep the same hero/object from appearing in every story.
export const editorialMedia = {
  home: {
    kitchen: '/gallery/st-werkz/scalloped-onyx-bowl-b.jpg',
    washroom: '/gallery/st-werkz/portoro-cylinder-cup.jpg',
    decor: '/gallery/st-werkz/onyx-chess-casket.jpg',
    living: '/gallery/st-werkz/travertine-walnut-coffee.jpg',
  },
  studio: {
    atelier: '/gallery/st-werkz/portoro-workshop-mantel.jpg',
    aboutMaterial: '/gallery/st-werkz/nero-calcite-slab-b.jpg',
    aboutObject: '/gallery/st-werkz/tall-noir-vase.jpg',
  },
} as const;
