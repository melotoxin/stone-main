import { pieceHref, pieces, type Piece } from './gallery';
import { pakistanStones, stonePatternSrc, type PakistanStone } from './pakistan-stones';

export type MaterialsCategory = 'marble' | 'natural' | 'granite' | 'onyx' | 'travertine';

export type MaterialsCardKind = 'swatch' | 'project';

export type MaterialsCard = {
  id: string;
  kind: MaterialsCardKind;
  category: MaterialsCategory;
  name: string;
  image: string;
  colour?: string;
  stoneId?: string;
  pieceSlug?: string;
};

/** Beige / cream faces from our own stone-faces — not copied limestone product shots. */
export const NATURAL_STONE_IDS = [
  'tavera',
  'sona-beige',
  'mastung-cream',
  'sun-tippi',
  'botticino-fancy',
  'verona',
  'sahara-gold',
] as const;

const NATURAL_SET = new Set<string>(NATURAL_STONE_IDS);

export const MATERIALS_CATEGORY_ORDER: MaterialsCategory[] = [
  'marble',
  'natural',
  'granite',
  'onyx',
  'travertine',
];

const PROJECT_SPECS: { pieceSlug: string; category: MaterialsCategory }[] = [
  { pieceSlug: 'noir-gold-dining', category: 'marble' },
  { pieceSlug: 'portoro-slat-dining', category: 'marble' },
  { pieceSlug: 'nested-nero-tables', category: 'marble' },
  { pieceSlug: 'ochre-pedestal-table', category: 'marble' },
  { pieceSlug: 'luminous-onyx-plinth', category: 'onyx' },
  { pieceSlug: 'onyx-waterfall', category: 'onyx' },
  { pieceSlug: 'sage-onyx-organza', category: 'onyx' },
  { pieceSlug: 'sage-round-table', category: 'onyx' },
  { pieceSlug: 'hotel-reception', category: 'travertine' },
  { pieceSlug: 'counter-glow', category: 'travertine' },
  { pieceSlug: 'oval-travertine-pedestal', category: 'travertine' },
  { pieceSlug: 'travertine-round-dining', category: 'travertine' },
  { pieceSlug: 'stepped-travertine-table', category: 'travertine' },
  { pieceSlug: 'hex-pedestal-table', category: 'travertine' },
  { pieceSlug: 'monolith-coffee-table', category: 'travertine' },
  { pieceSlug: 'cream-gathering-table', category: 'natural' },
  { pieceSlug: 'cream-companion-tables', category: 'natural' },
  { pieceSlug: 'amber-showroom-table', category: 'natural' },
];

/** First-party interior not yet hung as a collection piece. */
const EXTRA_PROJECTS: MaterialsCard[] = [
  {
    id: 'project-black-gold-interior',
    kind: 'project',
    category: 'marble',
    name: 'Black and Gold',
    image: '/gallery/interiors-pakistan-onyx-black-gold.jpg',
    colour: 'Black with golden spots and veins',
  },
];

export function stoneMaterialsCategory(stone: Pick<PakistanStone, 'id' | 'family'>): MaterialsCategory {
  if (NATURAL_SET.has(stone.id)) return 'natural';
  return stone.family;
}

function swatchCard(stone: PakistanStone): MaterialsCard {
  return {
    id: `swatch-${stone.id}`,
    kind: 'swatch',
    category: stoneMaterialsCategory(stone),
    name: stone.name,
    image: stonePatternSrc(stone),
    colour: stone.colour,
    stoneId: stone.id,
  };
}

function projectCard(piece: Piece, category: MaterialsCategory): MaterialsCard {
  return {
    id: `project-${piece.slug}`,
    kind: 'project',
    category,
    name: piece.title,
    image: piece.images[0],
    colour: piece.material,
    pieceSlug: piece.slug,
  };
}

function interleave(swatches: MaterialsCard[], projects: MaterialsCard[]): MaterialsCard[] {
  const out: MaterialsCard[] = [];
  let projectIndex = 0;
  swatches.forEach((swatch, index) => {
    out.push(swatch);
    if ((index + 1) % 3 === 0 && projectIndex < projects.length) {
      out.push(projects[projectIndex]);
      projectIndex += 1;
    }
  });
  while (projectIndex < projects.length) {
    out.push(projects[projectIndex]);
    projectIndex += 1;
  }
  return out;
}

function swatchesFor(category: MaterialsCategory): MaterialsCard[] {
  if (category === 'granite' || category === 'travertine') return [];
  return pakistanStones.filter((stone) => stoneMaterialsCategory(stone) === category).map(swatchCard);
}

function projectsFor(category: MaterialsCategory): MaterialsCard[] {
  const fromPieces = PROJECT_SPECS.filter((spec) => spec.category === category)
    .map((spec) => {
      const piece = pieces.find((entry) => entry.slug === spec.pieceSlug);
      return piece ? projectCard(piece, spec.category) : null;
    })
    .filter((card): card is MaterialsCard => Boolean(card));
  return [...fromPieces, ...EXTRA_PROJECTS.filter((card) => card.category === category)];
}

export function materialsCards(category: MaterialsCategory): MaterialsCard[] {
  return interleave(swatchesFor(category), projectsFor(category));
}

export function visibleMaterialsCategories(): MaterialsCategory[] {
  return MATERIALS_CATEGORY_ORDER.filter((category) => materialsCards(category).length > 0);
}

export function findMaterialsCard(id: string): MaterialsCard | undefined {
  for (const category of MATERIALS_CATEGORY_ORDER) {
    const match = materialsCards(category).find((card) => card.id === id || card.stoneId === id);
    if (match) return match;
  }
  return undefined;
}

export function categoryForStoneId(id: string): MaterialsCategory | undefined {
  const stone = pakistanStones.find((entry) => entry.id === id);
  if (stone) return stoneMaterialsCategory(stone);
  return findMaterialsCard(id)?.category;
}

export function materialHref(card: MaterialsCard): string | undefined {
  if (!card.pieceSlug) return undefined;
  const piece = pieces.find((entry) => entry.slug === card.pieceSlug);
  return piece ? pieceHref(piece) : undefined;
}
