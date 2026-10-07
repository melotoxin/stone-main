import { getPiece, pieces, type Piece } from './gallery';
import { getWorkRecord } from './knowledge';
import type { FinishKind, StoneFamily } from './materials';

export type { FinishKind, StoneFamily };

export const ESTIMATE_STORAGE_KEY = 'stoneworks.estimate.brief';

/** Conversation conversion only — not a bank or invoice rate. */
export const INDICATIVE_USD_RATE = 280;

export type CommissionKind =
  | 'dining-table'
  | 'coffee-table'
  | 'side-table'
  | 'counter'
  | 'slab'
  | 'sink'
  | 'object';
export type ShapeKind = 'round' | 'oval' | 'rectangle' | 'custom';
export type DimUnit = 'cm' | 'in';

export type EstimateDraft = {
  commission: CommissionKind;
  stone: StoneFamily;
  finish: FinishKind;
  shape: ShapeKind;
  unit: DimUnit;
  length: number;
  width: number;
  thickness: number;
  notes: string;
  workSlug: string;
};

export type EstimateResult = {
  areaM2: number;
  volumeM3: number;
  lowPkr: number;
  highPkr: number;
  lowUsd: number;
  highUsd: number;
  usdRate: number;
  lead: string;
  valid: boolean;
};

export const commissions: { id: CommissionKind; label: string; note: string }[] = [
  { id: 'dining-table', label: 'Dining table', note: 'A gathering top' },
  { id: 'coffee-table', label: 'Coffee table', note: 'Low, for living' },
  { id: 'side-table', label: 'Side table', note: 'Accent or companion' },
  { id: 'counter', label: 'Counter / plinth', note: 'Reception or bar' },
  { id: 'slab', label: 'Slab / top', note: 'The cut before the room' },
  { id: 'sink', label: 'Vessel sink', note: 'A basin as sculpture' },
  { id: 'object', label: 'Object', note: 'Bowl, tray, vessel' },
];

export const stones: { id: StoneFamily; label: string; note: string }[] = [
  { id: 'travertine', label: 'Travertine', note: 'Porous, calm, architectural' },
  { id: 'marble', label: 'Marble', note: 'Figured, often high polish' },
  { id: 'onyx', label: 'Onyx', note: 'Translucent, vein-led' },
  { id: 'mixed', label: 'Mixed', note: 'Stone with metal or a second cut' },
];

export const finishes: { id: FinishKind; label: string; note: string }[] = [
  { id: 'honed', label: 'Honed', note: 'Matte, soft to the hand' },
  { id: 'polished', label: 'Polished', note: 'A quiet mirror' },
  { id: 'backlit', label: 'Backlit', note: 'For translucent onyx' },
];

export const shapes: { id: ShapeKind; label: string }[] = [
  { id: 'round', label: 'Round' },
  { id: 'oval', label: 'Oval' },
  { id: 'rectangle', label: 'Rectangle' },
  { id: 'custom', label: 'Custom' },
];

const CM_PER_INCH = 2.54;

type CommissionProfile = {
  shape: ShapeKind;
  lengthCm: number;
  widthCm: number;
  thicknessCm: number;
  /** Relative fabrication intensity versus a simple rectangular top. */
  workLow: number;
  workHigh: number;
  floorLow: number;
  floorHigh: number;
  thicknessBaselineCm: number;
};

const COMMISSION: Record<CommissionKind, CommissionProfile> = {
  'dining-table': {
    shape: 'oval',
    lengthCm: 220,
    widthCm: 110,
    thicknessCm: 3,
    workLow: 1.22,
    workHigh: 1.38,
    floorLow: 280_000,
    floorHigh: 450_000,
    thicknessBaselineCm: 3,
  },
  'coffee-table': {
    shape: 'rectangle',
    lengthCm: 120,
    widthCm: 70,
    thicknessCm: 4,
    workLow: 1.08,
    workHigh: 1.22,
    floorLow: 95_000,
    floorHigh: 165_000,
    thicknessBaselineCm: 3,
  },
  'side-table': {
    shape: 'round',
    lengthCm: 45,
    widthCm: 45,
    thicknessCm: 3,
    workLow: 1.18,
    workHigh: 1.36,
    floorLow: 48_000,
    floorHigh: 88_000,
    thicknessBaselineCm: 3,
  },
  counter: {
    shape: 'rectangle',
    lengthCm: 240,
    widthCm: 70,
    thicknessCm: 8,
    workLow: 1.32,
    workHigh: 1.55,
    floorLow: 380_000,
    floorHigh: 680_000,
    thicknessBaselineCm: 6,
  },
  slab: {
    shape: 'rectangle',
    lengthCm: 280,
    widthCm: 160,
    thicknessCm: 2,
    workLow: 0.68,
    workHigh: 0.86,
    floorLow: 140_000,
    floorHigh: 260_000,
    thicknessBaselineCm: 2,
  },
  sink: {
    shape: 'round',
    lengthCm: 42,
    widthCm: 42,
    thicknessCm: 14,
    workLow: 1.48,
    workHigh: 1.78,
    floorLow: 55_000,
    floorHigh: 120_000,
    thicknessBaselineCm: 12,
  },
  object: {
    shape: 'custom',
    lengthCm: 30,
    widthCm: 22,
    thicknessCm: 8,
    workLow: 1.45,
    workHigh: 1.85,
    floorLow: 18_000,
    floorHigh: 42_000,
    thicknessBaselineCm: 6,
  },
};

/**
 * Indicative PKR per m² of finished face — studio bands, not a SKU list.
 * Grounded in typical Karachi atelier furniture/slab conversation ranges
 * for imported and selected local stone, 2025–2026, then widened on purpose.
 */
const STONE_PER_M2 = {
  travertine: { low: 95_000, high: 165_000 },
  marble: { low: 145_000, high: 285_000 },
  onyx: { low: 220_000, high: 430_000 },
  mixed: { low: 165_000, high: 320_000 },
} as const;

/** Extra band for carved / thick pieces, PKR per m³ of envelope. */
const STONE_PER_M3 = {
  travertine: { low: 1_600_000, high: 2_900_000 },
  marble: { low: 2_600_000, high: 5_200_000 },
  onyx: { low: 4_200_000, high: 8_800_000 },
  mixed: { low: 3_000_000, high: 6_200_000 },
} as const;

const SHAPE_WASTE = {
  rectangle: { low: 1.0, high: 1.08 },
  round: { low: 1.08, high: 1.22 },
  oval: { low: 1.12, high: 1.28 },
  custom: { low: 1.18, high: 1.42 },
} as const;

const FINISH_FACTOR = {
  honed: { low: 1.0, high: 1.06 },
  polished: { low: 1.08, high: 1.18 },
  backlit: { low: 1.35, high: 1.68 },
} as const;

const SLUG_COMMISSION: Partial<Record<string, CommissionKind>> = {
  'oval-travertine-pedestal': 'dining-table',
  'oval-travertine-assemblage': 'dining-table',
  'noir-gold-dining': 'dining-table',
  'portoro-slat-dining': 'dining-table',
  'cream-gathering-table': 'dining-table',
  'sage-round-table': 'dining-table',
  'sage-onyx-organza': 'dining-table',
  'travertine-round-dining': 'dining-table',
  'luminous-onyx-plinth': 'coffee-table',
  'emerald-cage-table': 'side-table',
  'sage-tulip-table': 'side-table',
  'cream-companion-tables': 'side-table',
  'travertine-cone-table': 'side-table',
  'notched-joinery-tables': 'coffee-table',
  'travertine-cross-table': 'coffee-table',
  'rust-cage-table': 'side-table',
  'stepped-travertine-table': 'coffee-table',
  'nested-nero-tables': 'coffee-table',
  'hex-pedestal-table': 'coffee-table',
  'monolith-coffee-table': 'coffee-table',
  'nero-gold-rim-table': 'coffee-table',
  'amber-showroom-table': 'coffee-table',
  'ochre-pedestal-table': 'side-table',
  'vessel-sink': 'sink',
  'hotel-reception': 'counter',
  'counter-glow': 'counter',
  'onyx-waterfall': 'counter',
  'noir-gold-disc': 'slab',
  'nero-marquina-slabs': 'slab',
};

export function cmToDisplay(cm: number, unit: DimUnit) {
  if (unit === 'in') return roundTo(cm / CM_PER_INCH, 1);
  return roundTo(cm, 1);
}

export function displayToCm(value: number, unit: DimUnit) {
  if (unit === 'in') return value * CM_PER_INCH;
  return value;
}

export function convertDraftUnit(draft: EstimateDraft, nextUnit: DimUnit): EstimateDraft {
  if (draft.unit === nextUnit) return draft;
  const lengthCm = displayToCm(draft.length, draft.unit);
  const widthCm = displayToCm(draft.width, draft.unit);
  const thicknessCm = displayToCm(draft.thickness, draft.unit);
  return {
    ...draft,
    unit: nextUnit,
    length: cmToDisplay(lengthCm, nextUnit),
    width: cmToDisplay(widthCm, nextUnit),
    thickness: cmToDisplay(thicknessCm, nextUnit),
  };
}

export function defaultDraft(commission: CommissionKind = 'dining-table'): EstimateDraft {
  const profile = COMMISSION[commission];
  return {
    commission,
    stone: 'travertine',
    finish: 'honed',
    shape: profile.shape,
    unit: 'cm',
    length: profile.lengthCm,
    width: profile.widthCm,
    thickness: profile.thicknessCm,
    notes: '',
    workSlug: '',
  };
}

export function applyCommissionDefaults(draft: EstimateDraft, commission: CommissionKind): EstimateDraft {
  const profile = COMMISSION[commission];
  const lengthCm = profile.lengthCm;
  const widthCm = profile.widthCm;
  const thicknessCm = profile.thicknessCm;
  return {
    ...draft,
    commission,
    shape: profile.shape,
    length: cmToDisplay(lengthCm, draft.unit),
    width: cmToDisplay(widthCm, draft.unit),
    thickness: cmToDisplay(thicknessCm, draft.unit),
    finish: finishAllowed(draft.stone, draft.finish) ? draft.finish : 'polished',
  };
}

export function finishAllowed(stone: StoneFamily, finish: FinishKind) {
  if (finish !== 'backlit') return true;
  return stone === 'onyx' || stone === 'mixed';
}

export function areaM2(draft: EstimateDraft) {
  const length = displayToCm(draft.length, draft.unit) / 100;
  const width = displayToCm(draft.width, draft.unit) / 100;
  if (length <= 0 || width <= 0) return 0;
  if (draft.shape === 'round') {
    const radius = length / 2;
    return Math.PI * radius * radius;
  }
  if (draft.shape === 'oval') {
    return Math.PI * (length / 2) * (width / 2);
  }
  const rect = length * width;
  return draft.shape === 'custom' ? rect * 1.06 : rect;
}

export function volumeM3(draft: EstimateDraft) {
  const thicknessM = displayToCm(draft.thickness, draft.unit) / 100;
  if (thicknessM <= 0) return 0;
  return areaM2(draft) * thicknessM;
}

export function computeEstimate(draft: EstimateDraft): EstimateResult {
  const area = areaM2(draft);
  const volume = volumeM3(draft);
  const lengthCm = displayToCm(draft.length, draft.unit);
  const widthCm = displayToCm(draft.width, draft.unit);
  const thicknessCm = displayToCm(draft.thickness, draft.unit);
  const valid =
    area > 0 &&
    volume > 0 &&
    lengthCm >= 8 &&
    (draft.shape === 'round' || widthCm >= 8) &&
    thicknessCm >= 1 &&
    lengthCm <= 600 &&
    widthCm <= 400 &&
    thicknessCm <= 80;

  const usdRate = INDICATIVE_USD_RATE;
  const empty: EstimateResult = {
    areaM2: area,
    volumeM3: volume,
    lowPkr: 0,
    highPkr: 0,
    lowUsd: 0,
    highUsd: 0,
    usdRate,
    lead: leadCopy(draft),
    valid: false,
  };
  if (!valid) return empty;

  const profile = COMMISSION[draft.commission];
  const stone = STONE_PER_M2[draft.stone];
  const carved = STONE_PER_M3[draft.stone];
  const waste = SHAPE_WASTE[draft.shape];
  const finishId = finishAllowed(draft.stone, draft.finish) ? draft.finish : 'polished';
  const finish = FINISH_FACTOR[finishId];
  const thickDelta = (thicknessCm - profile.thicknessBaselineCm) * 0.07;
  const thickLow = clamp(1 + Math.min(thickDelta, 0) * 0.6, 0.88, 1.55);
  const thickHigh = clamp(1 + Math.max(thickDelta, 0) + Math.min(Math.max(thickDelta, 0), 0.12), 0.92, 1.7);

  const carvedWeight = draft.commission === 'object' || draft.commission === 'sink' ? 0.55 : 0.12;

  const rawLow =
    (area * stone.low * (1 - carvedWeight) + volume * carved.low * carvedWeight) *
    waste.low *
    finish.low *
    profile.workLow *
    thickLow;
  const rawHigh =
    (area * stone.high * (1 - carvedWeight) + volume * carved.high * carvedWeight) *
    waste.high *
    finish.high *
    profile.workHigh *
    thickHigh;

  const lowPkr = roundBand(Math.max(rawLow, profile.floorLow * finish.low));
  let highPkr = roundBand(Math.max(rawHigh, profile.floorHigh * finish.high, lowPkr * 1.42));
  if (highPkr <= lowPkr) highPkr = roundBand(lowPkr * 1.45);

  return {
    areaM2: area,
    volumeM3: volume,
    lowPkr,
    highPkr,
    lowUsd: roundUsd(lowPkr / usdRate),
    highUsd: roundUsd(highPkr / usdRate),
    usdRate,
    lead: leadCopy(draft),
    valid: true,
  };
}

export function formatPkr(value: number) {
  return `PKR ${Math.round(value).toLocaleString('en-US')}`;
}

export function formatUsd(value: number) {
  return `USD ${Math.round(value).toLocaleString('en-US')}`;
}

export function formatArea(area: number) {
  if (area < 0.1) return `${(area * 10_000).toFixed(0)} cm²`;
  return `${area.toFixed(2)} m²`;
}

export function dimensionSummary(draft: EstimateDraft) {
  const u = draft.unit === 'in' ? 'in' : 'cm';
  const l = trimNum(draft.length);
  const w = trimNum(draft.width);
  const t = trimNum(draft.thickness);
  if (draft.shape === 'round') return `Ø ${l} × ${t} ${u} thick`;
  return `${l} × ${w} × ${t} ${u}`;
}

export function commissionLabel(id: CommissionKind) {
  return commissions.find((entry) => entry.id === id)?.label ?? id;
}

export function stoneLabel(id: StoneFamily) {
  return stones.find((entry) => entry.id === id)?.label ?? id;
}

export function finishLabel(id: FinishKind) {
  return finishes.find((entry) => entry.id === id)?.label ?? id;
}

export function shapeLabel(id: ShapeKind) {
  return shapes.find((entry) => entry.id === id)?.label ?? id;
}

export function composeBrief(draft: EstimateDraft, result: EstimateResult) {
  const work = draft.workSlug ? pieces.find((piece) => piece.slug === draft.workSlug) : undefined;
  const lines = [
    'Studio estimate briefing — an indicative range, not a quotation.',
    '',
    `Commission: ${commissionLabel(draft.commission)}`,
    `Stone family: ${stoneLabel(draft.stone)}`,
    `Finish: ${finishAllowed(draft.stone, draft.finish) ? finishLabel(draft.finish) : 'Polished (backlight needs onyx)'}`,
    `Shape: ${shapeLabel(draft.shape)}`,
    `Dimensions: ${dimensionSummary(draft)}`,
    `Stone area (read from the plan): ${formatArea(result.areaM2)}`,
  ];
  if (work) {
    lines.push(`Referring to the collection work: ${work.title}`);
  }
  if (result.valid) {
    lines.push(
      '',
      `Indicative studio range: ${formatPkr(result.lowPkr)} – ${formatPkr(result.highPkr)}`,
      `(≈ ${formatUsd(result.lowUsd)} – ${formatUsd(result.highUsd)} at ${result.usdRate} PKR/USD, a conversation rate only.)`,
      '',
      result.lead,
    );
  }
  if (draft.notes.trim()) {
    lines.push('', `Notes: ${draft.notes.trim()}`);
  }
  lines.push('', 'A viewing confirms the stone. Every slab is unique.');
  return lines.join('\n');
}

export function enquireHref(draft: EstimateDraft, result: EstimateResult) {
  const params = new URLSearchParams();
  params.set('from', 'estimate');
  if (draft.workSlug) params.set('work', draft.workSlug);
  const brief = composeBrief(draft, result);
  if (brief.length <= 1600) params.set('brief', brief);
  return `/enquire?${params.toString()}`;
}

export function persistBrief(draft: EstimateDraft, result: EstimateResult) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(
    ESTIMATE_STORAGE_KEY,
    JSON.stringify({
      brief: composeBrief(draft, result),
      workSlug: draft.workSlug,
      range: result.valid ? `${formatPkr(result.lowPkr)} – ${formatPkr(result.highPkr)}` : '',
    }),
  );
}

export function readPersistedBrief() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(ESTIMATE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { brief?: string; workSlug?: string; range?: string };
    if (!parsed.brief) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function estimateHrefForPiece(piece: Piece) {
  return `/estimate?work=${encodeURIComponent(piece.slug)}`;
}

export function draftFromSearch(search: string): EstimateDraft {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const workSlug = params.get('work') ?? '';
  const room = params.get('room') ?? undefined;
  const piece = workSlug ? pieces.find((entry) => entry.slug === workSlug) ?? getPiece(room, workSlug) : undefined;
  if (piece) return draftFromPiece(piece);
  return defaultDraft();
}

export function draftFromPiece(piece: Piece): EstimateDraft {
  const commission = inferCommission(piece);
  const draft = defaultDraft(commission);
  const parsed = parsePieceDimensions(piece.dimensions);
  const profile = COMMISSION[commission];
  return {
    ...draft,
    stone: getWorkRecord(piece).stoneFamily,
    finish: getWorkRecord(piece).finish,
    shape: inferShape(piece, profile.shape),
    length: parsed?.lengthCm ?? profile.lengthCm,
    width: parsed?.widthCm ?? (inferShape(piece, profile.shape) === 'round' ? (parsed?.lengthCm ?? profile.lengthCm) : profile.widthCm),
    thickness: parsed?.thicknessCm ?? profile.thicknessCm,
    unit: 'cm',
    workSlug: piece.slug,
    notes: `In the spirit of ${piece.title} — ${piece.material}.`,
  };
}

function inferCommission(piece: Piece): CommissionKind {
  const mapped = SLUG_COMMISSION[piece.slug];
  if (mapped) return mapped;
  // Collection rooms group materials; the object's form determines fabrication.
  if (piece.room === 'slabs' || piece.room === 'tiles') return 'slab';
  const blob = `${piece.title} ${piece.form}`.toLowerCase();
  if (/\bsink\b/.test(blob) || /\bbasin\b/.test(piece.title.toLowerCase())) return 'sink';
  if (/\bcounter\b|\breception\b/.test(blob)) return 'counter';
  if (/\bdining\b|\bcaf[eé]\b/.test(blob)) return 'dining-table';
  if (/\bcoffee\b|\blow table\b|\bnesting\b/.test(blob)) return 'coffee-table';
  if (/\bside table\b|\baccent table\b|\bcompanion tables?\b|\bc-table\b/.test(blob)) return 'side-table';
  if (/\btable\b/.test(blob)) {
    // Some table titles omit the use, but their catalogue note names it.
    if (/\bside table\b/.test(piece.note.toLowerCase())) return 'side-table';
    if (/\bdining\b|\bcaf[eé]\b/.test(piece.note.toLowerCase())) return 'dining-table';
    return 'coffee-table';
  }
  return 'object';
}

function inferShape(piece: Piece, fallback: ShapeKind): ShapeKind {
  const blob = `${piece.title} ${piece.form}`.toLowerCase();
  if (blob.includes('oval') || blob.includes('ellip') || blob.includes('kidney')) return 'oval';
  if (blob.includes('circular') || blob.includes('round') || blob.includes('disc') || blob.includes('sphere')) return 'round';
  if (blob.includes('rectangular') || blob.includes('rectangle') || blob.includes('square')) return 'rectangle';
  return fallback;
}

function parsePieceDimensions(raw?: string) {
  if (!raw) return null;
  const inch = /["″]|in\b/i.test(raw);
  const nums = [...raw.matchAll(/(\d+(?:\.\d+)?)/g)].map((match) => Number(match[1]));
  if (nums.length === 0) return null;
  const toCm = (value: number) => (inch ? value * CM_PER_INCH : value);
  if (nums.length === 1) {
    return { lengthCm: toCm(nums[0]), widthCm: toCm(nums[0]), thicknessCm: 3 };
  }
  if (nums.length === 2) {
    return { lengthCm: toCm(nums[0]), widthCm: toCm(nums[0]), thicknessCm: toCm(nums[1]) };
  }
  return { lengthCm: toCm(nums[0]), widthCm: toCm(nums[1]), thicknessCm: toCm(nums[2]) };
}

function leadCopy(draft: EstimateDraft) {
  if (draft.finish === 'backlit' || draft.stone === 'onyx') {
    return 'Made to slab availability — typically fourteen to twenty weeks after the stone is reserved. Vein matching and lighting set the pace.';
  }
  if (draft.commission === 'slab') {
    return 'Yard slabs can be reserved sooner; cutting and finishing follow the chosen face — often four to eight weeks.';
  }
  if (draft.commission === 'object' || draft.commission === 'sink') {
    return 'Smaller works follow the block in hand — typically four to ten weeks after the stone is agreed.';
  }
  if (draft.commission === 'counter') {
    return 'Architectural pieces wait on the slab and the site — often ten to sixteen weeks after stone and drawings are confirmed.';
  }
  return 'Made to slab availability — typically eight to fourteen weeks after the stone is reserved. A viewing confirms the slab.';
}

function roundBand(value: number) {
  const step = value < 100_000 ? 1_000 : value < 1_000_000 ? 5_000 : 10_000;
  return Math.max(step, Math.round(value / step) * step);
}

function roundUsd(value: number) {
  const step = value < 1_000 ? 10 : 50;
  return Math.max(step, Math.round(value / step) * step);
}

function roundTo(value: number, places: number) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

function trimNum(value: number) {
  return Number.isInteger(value) ? String(value) : String(roundTo(value, 1));
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
