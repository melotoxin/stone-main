import { pieces } from './gallery';
import type { SpaceId } from './room-scenes';

type AccessoryPhoto = {
  id: string;
  title: string;
  material: string;
  description: string;
  image: string;
  alt: string;
  width: number;
  height: number;
};

export type ProductAccessory = AccessoryPhoto & (
  | { kind: 'set-component'; parentSlug: string; retouched?: true }
  | { kind: 'reference'; credit: { photographer: string; source: string; license: string } }
);

// Requested high-resolution extracted visuals are marked as retouched. Each
// detail links to the original complete-set photograph, without a separate SKU.
const washroomAccessories: ProductAccessory[] = [
  { id: 'portoro-soap-dispenser', kind: 'set-component', parentSlug: 'portoro-bath-set', retouched: true, title: 'Portoro Soap Dispenser', material: 'Polished black marble with gold veining', description: 'A rounded stone dispenser with a metal pump.', image: '/gallery/accessories/extracted/portoro-soap-dispenser.png', alt: 'Retouched detail of a black and gold marble soap dispenser; view the original Portoro Bath Set photograph', width: 1254, height: 1254 },
  { id: 'travertine-soap-dish', kind: 'set-component', parentSlug: 'travertine-vanity-gold', retouched: true, title: 'Travertine Soap Dish', material: 'Honed beige travertine', description: 'A shallow circular dish with a softly rounded rim.', image: '/gallery/accessories/extracted/travertine-soap-dish.png', alt: 'Retouched detail of a circular travertine soap dish; view the original Travertine Vanity with Gold Pump photograph', width: 1536, height: 1024 },
  { id: 'travertine-brush-holder', kind: 'set-component', parentSlug: 'travertine-bath-seven', retouched: true, title: 'Travertine Brush Holder', material: 'Honed travertine with a metal brush', description: 'A tall brush and cylindrical stone holder for beside the vanity.', image: '/gallery/accessories/extracted/travertine-brush-holder.png', alt: 'Retouched detail of a metal brush and cylindrical travertine holder; view the original Travertine Bath Seven photograph', width: 1024, height: 1536 },
  { id: 'travertine-cotton-jar', kind: 'set-component', parentSlug: 'travertine-bath-ensemble', retouched: true, title: 'Travertine Cotton Jar', material: 'Honed warm travertine', description: 'A carved cotton container with a softly rounded resting lid.', image: '/gallery/accessories/extracted/travertine-cotton-jar.png', alt: 'Retouched detail of a lidded travertine cotton jar; view the original Travertine Bath Ensemble photograph', width: 1441, height: 1091 },
];

// Licensed third-party photographs illustrate design references, never ST WERKZ
// stock. Their credit and reference status remain visible beside each item.
const kitchenAccessories: ProductAccessory[] = [
  { id: 'onyx-mortar-pestle', kind: 'reference', title: 'Onyx Mortar & Pestle', material: 'Cream and amber banded stone', description: 'A hand-held mortar and matching pestle, photographed in use.', image: '/gallery/references/onyx-mortar-pestle.jpg', alt: 'Real photograph of a person using a cream and amber banded stone mortar with its matching pestle', width: 1200, height: 1800, credit: { photographer: 'furkanfdemir', source: 'https://www.pexels.com/photo/close-up-of-a-person-using-mortar-and-pestle-10821247/', license: 'Pexels' } },
  { id: 'marble-serving-board', kind: 'reference', title: 'Marble Serving Board', material: 'White and grey marble', description: 'An elongated board with rounded ends, photographed with pastries.', image: '/gallery/references/marble-serving-board.jpg', alt: 'Real overhead photograph of a complete white and grey marble serving board holding three pastries', width: 1200, height: 1800, credit: { photographer: 'Polina Tankilevitch', source: 'https://www.pexels.com/photo/overhead-shot-of-croissants-on-a-marble-surface-4828312/', license: 'Pexels' } },
  { id: 'slate-cheese-platter', kind: 'reference', title: 'Slate Serving Platter', material: 'Natural black slate', description: 'A broad, textured stone platter for a table arrangement.', image: '/gallery/references/slate-cheese-platter.jpg', alt: 'Real overhead photograph of a complete rectangular black slate platter carrying a cheese and charcuterie arrangement', width: 1200, height: 824, credit: { photographer: 'Novkov Visuals', source: 'https://www.pexels.com/photo/gourmet-cheese-platter-on-slate-board-34644300/', license: 'Pexels' } },
];

export const productAccessories: Record<SpaceId, ProductAccessory[]> = {
  kitchen: kitchenAccessories,
  washroom: washroomAccessories,
  'home-decor': [],
};

export function accessoryParent(accessory: ProductAccessory) {
  if (accessory.kind !== 'set-component') return undefined;
  const parent = pieces.find(piece => piece.slug === accessory.parentSlug);
  if (!parent) throw new Error('Missing bath-set accessory parent: ' + accessory.parentSlug);
  return parent;
}

export function productItemCount(chapter: { id: SpaceId; pieces: unknown[] }) {
  return chapter.pieces.length + productAccessories[chapter.id].length;
}
