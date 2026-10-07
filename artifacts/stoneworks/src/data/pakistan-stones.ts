import { ESTIMATE_STORAGE_KEY, INDICATIVE_USD_RATE, formatPkr, formatUsd } from './estimate';

/** Conversation conversion only — keep in step with INDICATIVE_USD_RATE in estimate.ts. */
const USD_RATE = INDICATIVE_USD_RATE;

/** Published PKR/sq ft bands assume flooring through kitchen-top thickness. */
export const SLAB_THICKNESS_BASELINE_MM = 20;
export const SQ_FT_PER_M2 = 10.76391041671;

export type PakistanStoneFamily = 'marble' | 'onyx';
export type PakistanStoneGrade = 'budget' | 'standard' | 'premium' | 'luxury' | 'rare';

export type PakistanStone = {
  id: string;
  name: string;
  alsoKnownAs: string[];
  family: PakistanStoneFamily;
  colour: string;
  origin: string;
  grade: PakistanStoneGrade;
  /** Indicative Pakistani retail, PKR per sq ft, polished material, September 2026. */
  ratePkr: { low: number; high: number };
  use: string;
};

/** Market bands last aligned to Pakistani retail lists dated 3 September 2026. */
export const PAKISTAN_STONE_RATES_AS_OF = '2026-09-03';

export const pakistanStoneNote =
  'These are commercial names used in the Pakistani trade, and indicative retail material rates in PKR per square foot — flooring through kitchen-top thickness, September 2026. They are not laboratory names, not a St Werkz quotation, and not the price of a finished table. Grade, thickness, polish, wastage and the actual slab still move the figure. A viewing in Karachi confirms the stone.';

export const pakistanStones: PakistanStone[] = [
  {
    id: 'flower',
    name: 'Flower Marble',
    alsoKnownAs: ['Tipi Flower', 'Tippy Flower'],
    family: 'marble',
    colour: 'Red / pink floral figure',
    origin: 'Lasbela and Swat belts',
    grade: 'budget',
    ratePkr: { low: 65, high: 175 },
    use: 'Budget floors and decorative borders',
  },
  {
    id: 'sunny-grey',
    name: 'Sunny Grey',
    alsoKnownAs: ['Pakistan Grey', 'Buner Grey'],
    family: 'marble',
    colour: 'Cool grey, fine grain',
    origin: 'Buner, Khyber Pakhtunkhwa',
    grade: 'budget',
    ratePkr: { low: 65, high: 240 },
    use: 'Everyday floors and rooms',
  },
  {
    id: 'badal-grey',
    name: 'Badal Grey',
    alsoKnownAs: ['Badal', 'Ziarat Badal'],
    family: 'marble',
    colour: 'Clouded grey',
    origin: 'Swat, Khyber Pakhtunkhwa',
    grade: 'budget',
    ratePkr: { low: 70, high: 385 },
    use: 'Modern floors and stairs',
  },
  {
    id: 'silky-black',
    name: 'Silky Black',
    alsoKnownAs: ['Black Zebra', 'Pak Black (Buner)'],
    family: 'marble',
    colour: 'Jet black with faint movement',
    origin: 'Buner, Khyber Pakhtunkhwa',
    grade: 'budget',
    ratePkr: { low: 80, high: 320 },
    use: 'Borders, contrast strips, floors',
  },
  {
    id: 'tavera',
    name: 'Tavera',
    alsoKnownAs: ['Travera', 'Tervera', 'Tippy Tevera'],
    family: 'marble',
    colour: 'Warm beige / cream, often fossil',
    origin: 'Lasbela, Balochistan, and Swat',
    grade: 'budget',
    ratePkr: { low: 85, high: 370 },
    use: 'Family-home flooring',
  },
  {
    id: 'ziarat-grey',
    name: 'Ziarat Grey',
    alsoKnownAs: ['Grey Ziarat'],
    family: 'marble',
    colour: 'Even premium grey',
    origin: 'Mohmand / Ziarat white belt, KPK',
    grade: 'standard',
    ratePkr: { low: 85, high: 400 },
    use: 'Modern grey floors',
  },
  {
    id: 'sunny-white',
    name: 'Sunny White',
    alsoKnownAs: ['Pakistan White', 'Pasha White', 'Bampokha White'],
    family: 'marble',
    colour: 'Bright white, light grey vein',
    origin: 'Buner, Khyber Pakhtunkhwa',
    grade: 'standard',
    ratePkr: { low: 105, high: 420 },
    use: 'Homes, stairs, rooms',
  },
  {
    id: 'cheetah-white',
    name: 'Cheetah White',
    alsoKnownAs: ['Cheetah Marble'],
    family: 'marble',
    colour: 'White with spotted / leopard figure',
    origin: 'Khyber Pakhtunkhwa trade yards',
    grade: 'standard',
    ratePkr: { low: 110, high: 600 },
    use: 'Patterned feature floors',
  },
  {
    id: 'strawberry-red',
    name: 'Strawberry Red',
    alsoKnownAs: ['Strawberry Marble'],
    family: 'marble',
    colour: 'Warm red',
    origin: 'Pakistan local quarries',
    grade: 'standard',
    ratePkr: { low: 150, high: 400 },
    use: 'Borders and decorative floors',
  },
  {
    id: 'sun-tippi',
    name: 'Sun Tippi',
    alsoKnownAs: ['Tippi', 'Sunny Beige'],
    family: 'marble',
    colour: 'Warm beige with soft movement',
    origin: 'Lasbela, Balochistan',
    grade: 'standard',
    ratePkr: { low: 150, high: 520 },
    use: 'Warm interiors and stairs',
  },
  {
    id: 'cherry-pink',
    name: 'Cherry Pink',
    alsoKnownAs: ['Pink Marble'],
    family: 'marble',
    colour: 'Soft pink',
    origin: 'Pakistan local quarries',
    grade: 'standard',
    ratePkr: { low: 150, high: 650 },
    use: 'Accent floors and cladding',
  },
  {
    id: 'botticino-fancy',
    name: 'Botticino Fancy',
    alsoKnownAs: ['Booti Seena', 'Boticina Fancy', 'Pak Botticino'],
    family: 'marble',
    colour: 'Beige with cloudy figure',
    origin: 'Chagai, Balochistan',
    grade: 'standard',
    ratePkr: { low: 170, high: 400 },
    use: 'Family floors and kitchen tops',
  },
  {
    id: 'sona-beige',
    name: 'Sona Beige',
    alsoKnownAs: ['Golden Beige'],
    family: 'marble',
    colour: 'Golden beige',
    origin: 'Balochistan cream belts',
    grade: 'premium',
    ratePkr: { low: 180, high: 650 },
    use: 'Warm reception and cladding',
  },
  {
    id: 'verona',
    name: 'Verona / Perlino',
    alsoKnownAs: ['Parlino', 'Verona Beige', 'Spotted Verona'],
    family: 'marble',
    colour: 'Cream beige, sometimes spotted',
    origin: 'Khuzdar, Balochistan',
    grade: 'standard',
    ratePkr: { low: 150, high: 650 },
    use: 'Classic warm interiors',
  },
  {
    id: 'shangla-white',
    name: 'Shangla White',
    alsoKnownAs: ['Swat White'],
    family: 'marble',
    colour: 'Fine white',
    origin: 'Shangla, Swat',
    grade: 'standard',
    ratePkr: { low: 150, high: 500 },
    use: 'Floors and light cladding',
  },
  {
    id: 'elegant-grey',
    name: 'Elegant Grey',
    alsoKnownAs: ['Silver Grey', 'Oceanic Grey'],
    family: 'marble',
    colour: 'Silver-grey',
    origin: 'Pakistan grey belts',
    grade: 'premium',
    ratePkr: { low: 150, high: 900 },
    use: 'Modern villas and bathrooms',
  },
  {
    id: 'mastung-cream',
    name: 'Mastung Cream',
    alsoKnownAs: ['Loralai Cream'],
    family: 'marble',
    colour: 'Dark cream, compact grain',
    origin: 'Mastung and Loralai, Balochistan',
    grade: 'standard',
    ratePkr: { low: 180, high: 550 },
    use: 'Warm floors and stairs',
  },
  {
    id: 'jungle-green',
    name: 'Jungle Green',
    alsoKnownAs: ['Pak Green', 'Forest Green'],
    family: 'marble',
    colour: 'Deep green',
    origin: 'Pakistan green marble belts',
    grade: 'premium',
    ratePkr: { low: 200, high: 1000 },
    use: 'Borders, mosques, feature panels',
  },
  {
    id: 'pak-black',
    name: 'Pak Black',
    alsoKnownAs: ['Jet Black', 'Balochistan Black'],
    family: 'marble',
    colour: 'Dense black',
    origin: 'Buner and Balochistan',
    grade: 'premium',
    ratePkr: { low: 200, high: 550 },
    use: 'Borders, stairs, feature areas',
  },
  {
    id: 'mohmand-white',
    name: 'Mohmand White',
    alsoKnownAs: ['Tribal White', 'Pak Carrara'],
    family: 'marble',
    colour: 'White with grey calcite',
    origin: 'Mohmand, Khyber Pakhtunkhwa',
    grade: 'premium',
    ratePkr: { low: 200, high: 700 },
    use: 'Floors, walls, furniture tops',
  },
  {
    id: 'antique-green',
    name: 'Antique Green',
    alsoKnownAs: ['Green Antique'],
    family: 'marble',
    colour: 'Heritage green with figure',
    origin: 'Pakistan green marble belts',
    grade: 'premium',
    ratePkr: { low: 250, high: 1100 },
    use: 'Feature panels and cladding',
  },
  {
    id: 'golden-marble',
    name: 'Golden Marble',
    alsoKnownAs: ['Pakistan Gold'],
    family: 'marble',
    colour: 'Gold on cream or beige',
    origin: 'Pakistan / mixed local gold belts',
    grade: 'premium',
    ratePkr: { low: 250, high: 700 },
    use: 'Classic luxury interiors',
  },
  {
    id: 'pakistan-chocolate',
    name: 'Pakistan Chocolate',
    alsoKnownAs: ['Chocolate Brown', 'Pakistan Emperador'],
    family: 'marble',
    colour: 'Warm brown',
    origin: 'Balochistan brown belts',
    grade: 'premium',
    ratePkr: { low: 250, high: 950 },
    use: 'Reception and cladding',
  },
  {
    id: 'teakwood',
    name: 'Teak Wood Marble',
    alsoKnownAs: ['Pak Teakwood', 'Wooden Marble'],
    family: 'marble',
    colour: 'Wood-grain brown',
    origin: 'Lasbela, Balochistan',
    grade: 'premium',
    ratePkr: { low: 250, high: 1000 },
    use: 'Warm rooms and furniture faces',
  },
  {
    id: 'black-n-gold',
    name: 'Black and Gold',
    alsoKnownAs: ['Pak Black & Gold', 'Black n Gold'],
    family: 'marble',
    colour: 'Black with golden spots and veins',
    origin: 'Lasbela, Balochistan',
    grade: 'premium',
    ratePkr: { low: 275, high: 750 },
    use: 'Luxury borders, walls, counters',
  },
  {
    id: 'himalayan-white',
    name: 'Himalayan White',
    alsoKnownAs: ['Hunza White', 'Jinnah White', 'K2 White'],
    family: 'marble',
    colour: 'Northern white',
    origin: 'Chitral, Hunza and northern belts',
    grade: 'premium',
    ratePkr: { low: 300, high: 1000 },
    use: 'Premium white interiors',
  },
  {
    id: 'ziarat-white',
    name: 'Ziarat White',
    alsoKnownAs: ['Universal White', 'Super White', 'Pakistani Carrara'],
    family: 'marble',
    colour: 'Clean white with subtle grey vein',
    origin: 'Mohmand Agency, Khyber Pakhtunkhwa',
    grade: 'premium',
    ratePkr: { low: 320, high: 850 },
    use: 'Luxury floors, stairs, walls',
  },
  {
    id: 'sahara-gold',
    name: 'Sahara Gold',
    alsoKnownAs: ['Indus Gold (trade)'],
    family: 'marble',
    colour: 'Sandy gold',
    origin: 'Pakistan gold-stone belts',
    grade: 'premium',
    ratePkr: { low: 300, high: 800 },
    use: 'Feature floors and cladding',
  },
  {
    id: 'indus-gold',
    name: 'Indus Gold',
    alsoKnownAs: ['Inca Gold', 'Fairy Gold'],
    family: 'marble',
    colour: 'Strong golden figure',
    origin: 'Pakistan gold-stone belts',
    grade: 'premium',
    ratePkr: { low: 350, high: 1000 },
    use: 'Golden feature walls and floors',
  },
  {
    id: 'ziarat-supreme',
    name: 'Ziarat Supreme White',
    alsoKnownAs: ['Supreme White', 'Ziarat Super'],
    family: 'marble',
    colour: 'Highest-grade Ziarat white',
    origin: 'Mohmand, Khyber Pakhtunkhwa',
    grade: 'luxury',
    ratePkr: { low: 350, high: 1250 },
    use: 'Villas, stairs, reception',
  },
  {
    id: 'michael-angelo',
    name: 'Michael Angelo',
    alsoKnownAs: ['Michelangelo', 'Pakistan Portoro'],
    family: 'marble',
    colour: 'Black with gold / amber veins',
    origin: 'Chagai, Balochistan',
    grade: 'luxury',
    ratePkr: { low: 400, high: 1500 },
    use: 'Feature walls, counters, furniture',
  },
  {
    id: 'light-green-onyx',
    name: 'Light Green Onyx',
    alsoKnownAs: ['Sage Onyx', 'Soft Green Onyx'],
    family: 'onyx',
    colour: 'Pale green, cloudy, translucent',
    origin: 'Chagai–Bolan–Lasbela–Khuzdar belt',
    grade: 'luxury',
    ratePkr: { low: 2000, high: 6500 },
    use: 'Backlit walls, vanities, tabletops',
  },
  {
    id: 'green-onyx',
    name: 'Green Onyx',
    alsoKnownAs: ['Pak Green Onyx'],
    family: 'onyx',
    colour: 'Green with white, brown and gold bands',
    origin: 'Chagai, Balochistan',
    grade: 'luxury',
    ratePkr: { low: 2500, high: 8000 },
    use: 'Counters, tables, hotel interiors',
  },
  {
    id: 'multi-green-onyx',
    name: 'Multi Green Onyx',
    alsoKnownAs: ['Multigreen Onyx'],
    family: 'onyx',
    colour: 'Green, white, honey and gold mixed',
    origin: 'Chagai and Khuzdar',
    grade: 'luxury',
    ratePkr: { low: 2500, high: 9000 },
    use: 'Large cladding and reception',
  },
  {
    id: 'dark-green-onyx',
    name: 'Dark Green Onyx',
    alsoKnownAs: ['Emerald Onyx'],
    family: 'onyx',
    colour: 'Deep green, bold banding',
    origin: 'Chagai, Balochistan',
    grade: 'luxury',
    ratePkr: { low: 3000, high: 9500 },
    use: 'Statement walls and luxury tables',
  },
  {
    id: 'brown-onyx',
    name: 'Brown Onyx',
    alsoKnownAs: ['Multi Brown Onyx'],
    family: 'onyx',
    colour: 'Earth brown, cream and honey',
    origin: 'Balochistan onyx belt',
    grade: 'luxury',
    ratePkr: { low: 3000, high: 10000 },
    use: 'Tables, counters, decorative panels',
  },
  {
    id: 'honey-onyx',
    name: 'Honey Onyx',
    alsoKnownAs: ['Honey Caramel', 'Amber Onyx'],
    family: 'onyx',
    colour: 'Golden yellow / amber, highly translucent',
    origin: 'Chagai and Lasbela',
    grade: 'luxury',
    ratePkr: { low: 3500, high: 11000 },
    use: 'Backlit bars, bathrooms, panels',
  },
  {
    id: 'orange-onyx',
    name: 'Orange Onyx',
    alsoKnownAs: ['Orange Honey Onyx'],
    family: 'onyx',
    colour: 'Warm orange and gold',
    origin: 'Balochistan onyx belt',
    grade: 'luxury',
    ratePkr: { low: 4000, high: 12000 },
    use: 'Backlit panels and furniture',
  },
  {
    id: 'white-onyx',
    name: 'White Onyx',
    alsoKnownAs: ['Cream Onyx', 'Crystal White Onyx'],
    family: 'onyx',
    colour: 'White to cream, gold or grey vein',
    origin: 'Chagai; supply is limited',
    grade: 'rare',
    ratePkr: { low: 5000, high: 14000 },
    use: 'Luxury baths, vanities, tabletops',
  },
  {
    id: 'red-onyx',
    name: 'Red Onyx',
    alsoKnownAs: ['Rosso Onyx'],
    family: 'onyx',
    colour: 'Red with brown, green and cream',
    origin: 'Balochistan onyx belt',
    grade: 'rare',
    ratePkr: { low: 7000, high: 15000 },
    use: 'Feature walls and custom furniture',
  },
  {
    id: 'pink-onyx',
    name: 'Pink Onyx',
    alsoKnownAs: ['Afghan Pink (traded through Pakistan)'],
    family: 'onyx',
    colour: 'Rose / pink, often scarce',
    origin: 'Pakistan–Afghanistan onyx trade',
    grade: 'rare',
    ratePkr: { low: 8000, high: 16000 },
    use: 'Boutique interiors and tabletops',
  },
  {
    id: 'black-onyx',
    name: 'Black Onyx',
    alsoKnownAs: ['Dark Onyx'],
    family: 'onyx',
    colour: 'Near-black, limited translucency',
    origin: 'Balochistan; quarry-dependent',
    grade: 'rare',
    ratePkr: { low: 8000, high: 18000 },
    use: 'Modern counters and furniture',
  },
  {
    id: 'blue-onyx',
    name: 'Blue Onyx',
    alsoKnownAs: ['Pak Blue Onyx'],
    family: 'onyx',
    colour: 'Blue, the rarest regular colour',
    origin: 'Balochistan; not always in stock',
    grade: 'rare',
    ratePkr: { low: 10000, high: 20000 },
    use: 'Special luxury decorative work',
  },
];

export const pakistanMarbles = pakistanStones.filter((stone) => stone.family === 'marble');
export const pakistanOnyxes = pakistanStones.filter((stone) => stone.family === 'onyx');

const HIGHLIGHT_IDS = [
  'ziarat-white',
  'black-n-gold',
  'tavera',
  'sunny-grey',
  'michael-angelo',
  'green-onyx',
  'honey-onyx',
  'white-onyx',
] as const;

export const pakistanStoneHighlights = HIGHLIGHT_IDS.map(
  (id) => pakistanStones.find((stone) => stone.id === id)!,
);

export const pakistanStoneGradeLabel: Record<PakistanStoneGrade, string> = {
  budget: 'Budget',
  standard: 'Standard',
  premium: 'Premium',
  luxury: 'Luxury',
  rare: 'Rare',
};

export function formatStonePkr(stone: Pick<PakistanStone, 'ratePkr'>) {
  return `PKR ${stone.ratePkr.low.toLocaleString('en-US')}–${stone.ratePkr.high.toLocaleString('en-US')}`;
}

export function formatStoneUsd(stone: Pick<PakistanStone, 'ratePkr'>, rate = USD_RATE) {
  const low = Math.max(1, Math.round(stone.ratePkr.low / rate));
  const high = Math.max(low + 1, Math.round(stone.ratePkr.high / rate));
  return `≈ USD ${low.toLocaleString('en-US')}–${high.toLocaleString('en-US')}`;
}

export function stonesByFamily(family: PakistanStoneFamily | 'all') {
  if (family === 'all') return pakistanStones;
  return pakistanStones.filter((stone) => stone.family === family);
}

export function stonePatternSrc(stone: Pick<PakistanStone, 'id'>) {
  return `/gallery/stone-faces/${stone.id}.jpg`;
}

export type AreaUnit = 'sqft' | 'm2';

export type SlabProjectDraft = {
  stoneId: string;
  area: number;
  unit: AreaUnit;
  thicknessMm: number;
  wastagePct: number;
  port: string;
  crates: number;
};

export type SlabProjectResult = {
  stone: PakistanStone | undefined;
  areaSqFt: number;
  billedSqFt: number;
  thicknessFactor: number;
  wasteFactor: number;
  lowPkr: number;
  highPkr: number;
  lowUsd: number;
  highUsd: number;
  usdRate: number;
  valid: boolean;
};

export function defaultSlabDraft(mode: 'project' | 'export' = 'project'): SlabProjectDraft {
  return {
    stoneId: 'ziarat-white',
    area: mode === 'export' ? 400 : 200,
    unit: 'sqft',
    thicknessMm: SLAB_THICKNESS_BASELINE_MM,
    wastagePct: 10,
    port: '',
    crates: 1,
  };
}

export function areaToSqFt(area: number, unit: AreaUnit) {
  if (!Number.isFinite(area) || area <= 0) return 0;
  return unit === 'm2' ? area * SQ_FT_PER_M2 : area;
}

/** Linear scale of the published per-sq-ft band versus a 20 mm kitchen-top. */
export function slabThicknessFactor(thicknessMm: number) {
  if (!Number.isFinite(thicknessMm) || thicknessMm <= 0) return 1;
  return clamp(thicknessMm / SLAB_THICKNESS_BASELINE_MM, 0.85, 2);
}

export function computeSlabProject(draft: SlabProjectDraft): SlabProjectResult {
  const stone = pakistanStones.find((entry) => entry.id === draft.stoneId);
  const areaSqFt = areaToSqFt(draft.area, draft.unit);
  const wasteFactor = 1 + clamp(draft.wastagePct, 0, 40) / 100;
  const thicknessFactor = slabThicknessFactor(draft.thicknessMm);
  const billedSqFt = areaSqFt * wasteFactor * thicknessFactor;
  const usdRate = INDICATIVE_USD_RATE;
  const valid =
    Boolean(stone) &&
    areaSqFt > 0 &&
    areaSqFt <= 80_000 &&
    draft.thicknessMm >= 8 &&
    draft.thicknessMm <= 80;

  if (!stone || !valid) {
    return {
      stone,
      areaSqFt,
      billedSqFt,
      thicknessFactor,
      wasteFactor,
      lowPkr: 0,
      highPkr: 0,
      lowUsd: 0,
      highUsd: 0,
      usdRate,
      valid: false,
    };
  }

  const lowPkr = roundBand(stone.ratePkr.low * billedSqFt);
  let highPkr = roundBand(stone.ratePkr.high * billedSqFt);
  if (highPkr <= lowPkr) highPkr = roundBand(lowPkr * 1.35);

  return {
    stone,
    areaSqFt,
    billedSqFt,
    thicknessFactor,
    wasteFactor,
    lowPkr,
    highPkr,
    lowUsd: roundUsd(lowPkr / usdRate),
    highUsd: roundUsd(highPkr / usdRate),
    usdRate,
    valid: true,
  };
}

export function formatAreaSqFt(area: number) {
  if (area < 1) return `${area.toFixed(2)} sq ft`;
  return `${area.toLocaleString('en-US', { maximumFractionDigits: 1 })} sq ft`;
}

export function composeSlabBrief(
  draft: SlabProjectDraft,
  result: SlabProjectResult,
  mode: 'project' | 'export' = 'project',
) {
  const stone = result.stone;
  const lines = [
    mode === 'export'
      ? 'Export lot briefing — indicative material only, not a quotation or a freight quote.'
      : 'Project stone briefing — indicative material only, not a quotation.',
    '',
    `Named stone: ${stone ? `${stone.name} (${stone.origin})` : draft.stoneId}`,
    `Plan area: ${formatAreaSqFt(result.areaSqFt)}${draft.unit === 'm2' ? ` · entered as ${trimNum(draft.area)} m²` : ''}`,
    `Thickness: ${trimNum(draft.thicknessMm)} mm (published bands assume ~${SLAB_THICKNESS_BASELINE_MM} mm kitchen-top; thicker faces scale that band)`,
    `Wastage allowed: ${trimNum(draft.wastagePct)}%`,
    `Billed face: ${formatAreaSqFt(result.billedSqFt)}`,
  ];
  if (mode === 'export') {
    if (draft.port.trim()) lines.push(`Destination port: ${draft.port.trim()}`);
    const crateWord = draft.crates === 1 ? 'crate' : 'crates';
    lines.push(
      `Crate / lot language: ${trimNum(draft.crates)} ${crateWord} discussed — packing is confirmed in writing.`,
      'Incoterms start FOB Karachi. Freight and destination charges are named separately.',
    );
  }
  if (result.valid && stone) {
    lines.push(
      '',
      `Indicative material: ${formatPkr(result.lowPkr)} – ${formatPkr(result.highPkr)}`,
      `(≈ ${formatUsd(result.lowUsd)} – ${formatUsd(result.highUsd)} at ${result.usdRate} PKR/USD, a conversation rate only.)`,
      `Published name band: ${formatStonePkr(stone)} per sq ft (as of ${PAKISTAN_STONE_RATES_AS_OF}).`,
    );
  }
  lines.push('', 'A viewing in Karachi confirms the stone. Every slab is unique.');
  return lines.join('\n');
}

export function persistSlabBrief(draft: SlabProjectDraft, result: SlabProjectResult, mode: 'project' | 'export' = 'project') {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(
    ESTIMATE_STORAGE_KEY,
    JSON.stringify({
      brief: composeSlabBrief(draft, result, mode),
      workSlug: '',
      range: result.valid ? `${formatPkr(result.lowPkr)} – ${formatPkr(result.highPkr)}` : '',
    }),
  );
}

export function slabEnquireHref(draft: SlabProjectDraft, result: SlabProjectResult, mode: 'project' | 'export' = 'project') {
  const params = new URLSearchParams();
  params.set('from', 'estimate');
  const brief = composeSlabBrief(draft, result, mode);
  if (brief.length <= 1600) params.set('brief', brief);
  return `/enquire?${params.toString()}`;
}

function roundBand(value: number) {
  const step = value < 100_000 ? 1_000 : value < 1_000_000 ? 5_000 : 10_000;
  return Math.max(step, Math.round(value / step) * step);
}

function roundUsd(value: number) {
  const step = value < 1_000 ? 10 : 50;
  return Math.max(step, Math.round(value / step) * step);
}

function trimNum(value: number) {
  return Number.isInteger(value) ? String(value) : String(Math.round(value * 10) / 10);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
