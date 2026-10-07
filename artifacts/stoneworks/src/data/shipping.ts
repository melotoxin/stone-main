import { INDICATIVE_USD_RATE, formatPkr, formatUsd } from './estimate';
import type { OfficeId } from './offices';

/** Conversation conversion only — same desk rate as stone estimates. */
export { INDICATIVE_USD_RATE };

export type ShippingMode = 'air' | 'sea' | 'land';
export type SeaBox = '20ft' | '40ft';
export type ShippingLane =
  | 'gulf'
  | 'asean'
  | 'med'
  | 'nwe'
  | 'usec'
  | 'uswc'
  | 'fareast'
  | 'southasia'
  | 'africa'
  | 'other';

export type PresetDestinationId = 'dubai' | 'kuala-lumpur' | 'barcelona' | 'new-york';

export type ShippingDestinationId = PresetDestinationId | 'custom';

export type ShippingDestination = {
  id: PresetDestinationId;
  officeId: OfficeId;
  city: string;
  country: string;
  portName: string;
  portCode: string;
  airport: string;
  airportCode: string;
  lane: ShippingLane;
  /** Through-truck from Karachi is a real commercial corridor. */
  landThrough: boolean;
  /** Nautical miles, Karachi / Port Qasim — planning distance, not a schedule. */
  seaNm: number;
};

/**
 * Studio desks plus the load/discharge names a freight desk would type.
 * Karachi remains origin; these are destinations, not second factories.
 */
export const shippingDestinations: readonly ShippingDestination[] = [
  {
    id: 'dubai',
    officeId: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    portName: 'Jebel Ali',
    portCode: 'AEJEA',
    airport: 'Dubai International',
    airportCode: 'DXB',
    lane: 'gulf',
    landThrough: true,
    seaNm: 740,
  },
  {
    id: 'kuala-lumpur',
    officeId: 'kuala-lumpur',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    portName: 'Port Klang',
    portCode: 'MYPKG',
    airport: 'Kuala Lumpur International',
    airportCode: 'KUL',
    lane: 'asean',
    landThrough: false,
    seaNm: 2_850,
  },
  {
    id: 'barcelona',
    officeId: 'barcelona',
    city: 'Barcelona',
    country: 'Spain',
    portName: 'Barcelona',
    portCode: 'ESBCN',
    airport: 'Barcelona–El Prat',
    airportCode: 'BCN',
    lane: 'med',
    landThrough: false,
    seaNm: 5_150,
  },
  {
    id: 'new-york',
    officeId: 'new-york',
    city: 'New York',
    country: 'United States',
    portName: 'New York / Newark',
    portCode: 'USNYC',
    airport: 'JFK / Newark',
    airportCode: 'JFK',
    lane: 'usec',
    landThrough: false,
    seaNm: 8_050,
  },
];

export const SHIPPING_ORIGIN = {
  city: 'Karachi',
  yard: 'North Nazimabad yard',
  seaPort: 'Port Qasim / Karachi',
  seaCode: 'PKBQM',
  airport: 'Jinnah International',
  airportCode: 'KHI',
} as const;

/**
 * Bands last aligned September 2026.
 * These are INDICATIVE corridor ranges for Karachi-origin stone (heavy, crated),
 * compiled from typical 2025–2026 spot conversation ranges on Gulf short-sea,
 * intra-Asia, Mediterranean and US East Coast lanes — the same shape of
 * regional composite used in public Drewry WCI / Freightos FBX commentary.
 * They are not a booking, not a tariff, and not a live quote from Maersk,
 * MSC, Hapag-Lloyd, FedEx, Emirates SkyCargo, or any named carrier.
 */
export const SHIPPING_RATES_AS_OF = '2026-09-09';

export const SHIPPING_SOURCE_NAME = 'St Werkz Karachi-origin corridor bands';

export const SHIPPING_SOURCE_NOTE =
  'Indicative / not a booking quote. Ocean and air figures are studio corridor bands from typical Karachi-origin spot ranges (2025–2026), not live rates from a carrier API.';

type MoneyBand = { low: number; high: number };

/** Ocean freight USD per FCL, FOB Karachi / Port Qasim, stone-weight cargo. */
const SEA_20: Record<ShippingLane, MoneyBand> = {
  gulf: { low: 750, high: 1_700 },
  asean: { low: 1_150, high: 2_600 },
  med: { low: 1_800, high: 4_400 },
  nwe: { low: 2_000, high: 4_800 },
  usec: { low: 2_400, high: 5_800 },
  uswc: { low: 2_600, high: 6_200 },
  fareast: { low: 1_400, high: 3_400 },
  southasia: { low: 650, high: 1_500 },
  africa: { low: 1_600, high: 4_200 },
  other: { low: 1_600, high: 5_000 },
};

/** 40ft typically 1.55–1.75× a 20ft on these lanes, not double. */
const SEA_40_FACTOR = { low: 1.52, high: 1.72 };

/** Air general cargo + stone/heavy add, USD per chargeable kg, KHI origin. */
const AIR_PER_KG: Record<ShippingLane, MoneyBand> = {
  gulf: { low: 3.6, high: 7.4 },
  asean: { low: 4.4, high: 9.0 },
  med: { low: 5.4, high: 11.2 },
  nwe: { low: 5.6, high: 11.6 },
  usec: { low: 6.8, high: 13.8 },
  uswc: { low: 7.2, high: 14.6 },
  fareast: { low: 5.0, high: 10.5 },
  southasia: { low: 2.8, high: 6.2 },
  africa: { low: 5.8, high: 12.4 },
  other: { low: 5.0, high: 12.0 },
};

const AIR_MIN: MoneyBand = { low: 180, high: 360 };

/** Through-truck Karachi → GCC / nearby, USD per trailer (~20–24 t). */
const LAND_THROUGH: Record<ShippingLane, MoneyBand> = {
  gulf: { low: 1_700, high: 3_600 },
  southasia: { low: 900, high: 2_200 },
  other: { low: 1_400, high: 3_800 },
  asean: { low: 0, high: 0 },
  med: { low: 0, high: 0 },
  nwe: { low: 0, high: 0 },
  usec: { low: 0, high: 0 },
  uswc: { low: 0, high: 0 },
  fareast: { low: 0, high: 0 },
  africa: { low: 0, high: 0 },
};

/** First mile: Karachi yard → Port Qasim / KHI cargo, USD per trailer or crate-run. */
const FIRST_MILE_TRUCK: MoneyBand = { low: 160, high: 420 };

/** Last mile: discharge port / airport → city desk, USD. */
const LAST_MILE: Record<PresetDestinationId, MoneyBand> = {
  dubai: { low: 80, high: 240 },
  'kuala-lumpur': { low: 160, high: 460 },
  barcelona: { low: 220, high: 580 },
  'new-york': { low: 380, high: 920 },
};

const LAST_MILE_LANE: Record<ShippingLane, MoneyBand> = {
  gulf: { low: 80, high: 260 },
  asean: { low: 150, high: 480 },
  med: { low: 200, high: 620 },
  nwe: { low: 220, high: 680 },
  usec: { low: 360, high: 980 },
  uswc: { low: 380, high: 1_050 },
  fareast: { low: 180, high: 560 },
  southasia: { low: 70, high: 220 },
  africa: { low: 180, high: 640 },
  other: { low: 180, high: 700 },
};

/** IATA volumetric: 1 CBM ≈ 167 chargeable kg. */
export const AIR_KG_PER_CBM = 167;

export const DEFAULT_SAMPLE_CRATE_KG = 120;
export const DEFAULT_SAMPLE_CRATE_CBM = 0.35;
export const DEFAULT_SEA_BOX: SeaBox = '20ft';
export const DEFAULT_CRATES = 1;
export const DEFAULT_CONTAINERS = 1;
export const DEFAULT_TRUCKS = 1;

export type ShippingDraft = {
  mode: ShippingMode;
  destinationId: ShippingDestinationId;
  customPort: string;
  crates: number;
  kgEach: number;
  cbmEach: number;
  seaBox: SeaBox;
  containers: number;
  trucks: number;
};

export type ShippingEstimate = {
  valid: boolean;
  mode: ShippingMode;
  destinationLabel: string;
  portLabel: string;
  lane: ShippingLane;
  landThrough: boolean;
  lowUsd: number;
  highUsd: number;
  lowPkr: number;
  highPkr: number;
  usdRate: number;
  currency: 'USD';
  sourceName: string;
  sourceKind: 'indicative-band' | 'live-api';
  vendorName?: string;
  asOf: string;
  assumed: string;
  transit: string;
  landNote: 'through' | 'split' | 'none';
  unit: string;
};

export function defaultShippingDraft(): ShippingDraft {
  return {
    mode: 'sea',
    destinationId: 'dubai',
    customPort: '',
    crates: DEFAULT_CRATES,
    kgEach: DEFAULT_SAMPLE_CRATE_KG,
    cbmEach: DEFAULT_SAMPLE_CRATE_CBM,
    seaBox: DEFAULT_SEA_BOX,
    containers: DEFAULT_CONTAINERS,
    trucks: DEFAULT_TRUCKS,
  };
}

export function getPresetDestination(id: ShippingDestinationId) {
  if (id === 'custom') return undefined;
  return shippingDestinations.find((entry) => entry.id === id);
}

export function destinationPortLabel(draft: ShippingDraft) {
  const preset = getPresetDestination(draft.destinationId);
  if (preset) return `${preset.portName} (${preset.portCode})`;
  const named = draft.customPort.trim();
  return named || 'Named port';
}

export function destinationCityLabel(draft: ShippingDraft) {
  const preset = getPresetDestination(draft.destinationId);
  if (preset) return preset.city;
  const named = draft.customPort.trim();
  return named || 'Named destination';
}

export function classifyCustomLane(raw: string): ShippingLane {
  const text = raw.toLowerCase();
  if (!text) return 'other';
  if (/(jebel|dubai|sharjah|abu dhabi|fujairah|doha|hamad|muscat|sohar|dammam|jeddah|riyadh|kuwait|bahrain|umm qasr)/.test(text)) {
    return 'gulf';
  }
  if (/(klang|kelang|singapore|penang|jakarta|tanjung|laem|bangkok|ho chi|saigon|manila|haiphong)/.test(text)) {
    return 'asean';
  }
  if (/(barcelona|valencia|genoa|genova|livorno|la spezia|marseille|fos|piraeus|istanbul|ambarli|algeciras|valencia)/.test(text)) {
    return 'med';
  }
  if (/(rotterdam|antwerp|hamburg|bremerhaven|felixstowe|southampton|le havre|zeebrugge)/.test(text)) {
    return 'nwe';
  }
  if (/(new york|newark|long island|norfolk|savannah|charleston|baltimore|houston|miami|boston)/.test(text)) {
    return 'usec';
  }
  if (/(los angeles|long beach|oakland|seattle|tacoma|vancouver)/.test(text)) {
    return 'uswc';
  }
  if (/(shanghai|ningbo|shenzhen|yantian|qingdao|busan|yokohama|tokyo|kaohsiung)/.test(text)) {
    return 'fareast';
  }
  if (/(mumbai|nhava|chennai|colombo|chittagong|mondra|mundra|pipavav|lahore|islamabad)/.test(text)) {
    return 'southasia';
  }
  if (/(mombasa|dar es|lagos|durban|cape town|tangier|alexandria)/.test(text)) {
    return 'africa';
  }
  return 'other';
}

export function customLandThrough(raw: string) {
  const text = raw.toLowerCase();
  return /(dubai|sharjah|abu dhabi|fujairah|doha|muscat|sohar|dammam|jeddah|riyadh|kuwait|bahrain|lahore|islamabad|quetta|peshawar|hyderabad|sukkur|gwadar|zahedan|tehran|kabul|kandahar|delhi|mumbai|jaipur|quetta)/.test(
    text,
  );
}

export function resolveLane(draft: ShippingDraft): { lane: ShippingLane; landThrough: boolean; seaNm: number } {
  const preset = getPresetDestination(draft.destinationId);
  if (preset) {
    return { lane: preset.lane, landThrough: preset.landThrough, seaNm: preset.seaNm };
  }
  const lane = classifyCustomLane(draft.customPort);
  const landThrough = customLandThrough(draft.customPort) || lane === 'gulf' || lane === 'southasia';
  const seaNm =
    lane === 'gulf' ? 800 :
    lane === 'southasia' ? 900 :
    lane === 'asean' ? 2_900 :
    lane === 'fareast' ? 5_200 :
    lane === 'med' ? 5_200 :
    lane === 'nwe' ? 6_400 :
    lane === 'africa' ? 4_200 :
    lane === 'usec' ? 8_100 :
    lane === 'uswc' ? 10_400 :
    5_500;
  return { lane, landThrough, seaNm };
}

export function chargeableAirKg(draft: ShippingDraft) {
  const crates = Math.max(0, draft.crates);
  const actual = crates * Math.max(0, draft.kgEach);
  const volumetric = crates * Math.max(0, draft.cbmEach) * AIR_KG_PER_CBM;
  return Math.max(actual, volumetric);
}

export function computeShippingEstimate(draft: ShippingDraft): ShippingEstimate {
  const { lane, landThrough, seaNm } = resolveLane(draft);
  const usdRate = INDICATIVE_USD_RATE;
  const destinationLabel = destinationCityLabel(draft);
  const portLabel = destinationPortLabel(draft);
  const named = draft.destinationId !== 'custom' || draft.customPort.trim().length > 1;
  const base = {
    valid: false,
    mode: draft.mode,
    destinationLabel,
    portLabel,
    lane,
    landThrough,
    lowUsd: 0,
    highUsd: 0,
    lowPkr: 0,
    highPkr: 0,
    usdRate,
    currency: 'USD' as const,
    sourceName: SHIPPING_SOURCE_NAME,
    sourceKind: 'indicative-band' as const,
    asOf: SHIPPING_RATES_AS_OF,
    assumed: '',
    transit: '',
    landNote: 'none' as const,
    unit: '',
  };

  if (!named && draft.destinationId === 'custom') return base;

  if (draft.mode === 'air') {
    const kg = chargeableAirKg(draft);
    if (kg <= 0) return base;
    const rate = AIR_PER_KG[lane];
    const lowUsd = roundUsd(Math.max(AIR_MIN.low, kg * rate.low));
    const highUsd = roundUsd(Math.max(AIR_MIN.high, kg * rate.high, lowUsd * 1.25));
    return {
      ...base,
      valid: true,
      lowUsd,
      highUsd,
      lowPkr: pkrFromUsd(lowUsd, usdRate),
      highPkr: pkrFromUsd(highUsd, usdRate),
      assumed: `${trimNum(draft.crates)} sample crate${draft.crates === 1 ? '' : 's'} · ${Math.round(kg)} kg chargeable (max of actual / volumetric at ${AIR_KG_PER_CBM} kg/CBM)`,
      transit: airTransit(lane),
      unit: 'air cargo, KHI',
    };
  }

  if (draft.mode === 'sea') {
    const count = Math.max(0, draft.containers);
    if (count <= 0) return base;
    const teu = SEA_20[lane];
    const factor = draft.seaBox === '40ft' ? SEA_40_FACTOR : { low: 1, high: 1 };
    const distanceNudge = seaDistanceNudge(seaNm, lane);
    const lowUsd = roundUsd(count * teu.low * factor.low * distanceNudge.low);
    const highUsd = roundUsd(Math.max(count * teu.high * factor.high * distanceNudge.high, lowUsd * 1.28));
    return {
      ...base,
      valid: true,
      lowUsd,
      highUsd,
      lowPkr: pkrFromUsd(lowUsd, usdRate),
      highPkr: pkrFromUsd(highUsd, usdRate),
      assumed: `${count} × ${draft.seaBox} FCL · crated slabs, FOB Karachi / Port Qasim · ocean freight only`,
      transit: seaTransit(lane),
      unit: `${draft.seaBox} FCL`,
    };
  }

  const trucks = Math.max(0, draft.trucks);
  if (trucks <= 0) return base;

  if (landThrough) {
    const band = LAND_THROUGH[lane].low > 0 ? LAND_THROUGH[lane] : LAND_THROUGH.other;
    const lowUsd = roundUsd(trucks * band.low);
    const highUsd = roundUsd(Math.max(trucks * band.high, lowUsd * 1.3));
    return {
      ...base,
      valid: true,
      lowUsd,
      highUsd,
      lowPkr: pkrFromUsd(lowUsd, usdRate),
      highPkr: pkrFromUsd(highUsd, usdRate),
      assumed: `${trucks} trailer${trucks === 1 ? '' : 's'} · through road from the Karachi yard (stone, ~20–24 t)`,
      transit: landTransit(lane),
      landNote: 'through',
      unit: 'road trailer',
    };
  }

  const last = lastMileFor(draft);
  const lowUsd = roundUsd(trucks * (FIRST_MILE_TRUCK.low + last.low));
  const highUsd = roundUsd(Math.max(trucks * (FIRST_MILE_TRUCK.high + last.high), lowUsd * 1.3));
  return {
    ...base,
    valid: true,
    lowUsd,
    highUsd,
    lowPkr: pkrFromUsd(lowUsd, usdRate),
    highPkr: pkrFromUsd(highUsd, usdRate),
    assumed: `${trucks} truck-run${trucks === 1 ? '' : 's'} · first mile yard→Port Qasim plus last mile discharge→desk. The ocean or air leg is not included.`,
    transit: 'Road legs only — typically 1–3 days each end',
    landNote: 'split',
    unit: 'first + last mile',
  };
}

export function applyLiveQuote(
  estimate: ShippingEstimate,
  live: { lowUsd: number; highUsd: number; vendorName: string; asOf?: string },
): ShippingEstimate {
  const lowUsd = roundUsd(live.lowUsd);
  const highUsd = roundUsd(Math.max(live.highUsd, lowUsd));
  return {
    ...estimate,
    valid: true,
    lowUsd,
    highUsd,
    lowPkr: pkrFromUsd(lowUsd, estimate.usdRate),
    highPkr: pkrFromUsd(highUsd, estimate.usdRate),
    sourceKind: 'live-api',
    sourceName: live.vendorName,
    vendorName: live.vendorName,
    asOf: live.asOf ?? estimate.asOf,
  };
}

export function formatShippingUsd(low: number, high: number) {
  return `${formatUsd(low)} – ${formatUsd(high)}`;
}

export function formatShippingPkr(low: number, high: number) {
  return `${formatPkr(low)} – ${formatPkr(high)}`;
}

export const shippingModes: { id: ShippingMode; label: string; note: string }[] = [
  { id: 'air', label: 'Air', note: 'Sample crates / chargeable kg' },
  { id: 'sea', label: 'Sea', note: '20ft / 40ft container' },
  { id: 'land', label: 'Land', note: 'Truck / road' },
];

function lastMileFor(draft: ShippingDraft): MoneyBand {
  const preset = getPresetDestination(draft.destinationId);
  if (preset) return LAST_MILE[preset.id];
  return LAST_MILE_LANE[classifyCustomLane(draft.customPort)];
}

function seaDistanceNudge(nm: number, lane: ShippingLane) {
  const typical =
    lane === 'gulf' ? 750 :
    lane === 'asean' ? 2_850 :
    lane === 'med' ? 5_150 :
    lane === 'usec' ? 8_050 :
    5_000;
  const ratio = clamp(nm / typical, 0.82, 1.22);
  return { low: 0.94 + (ratio - 1) * 0.35, high: 0.96 + (ratio - 1) * 0.45 };
}

function airTransit(lane: ShippingLane) {
  if (lane === 'gulf' || lane === 'southasia') return 'Often 2–6 days airport to airport, plus crate handling';
  if (lane === 'asean' || lane === 'fareast') return 'Often 4–9 days airport to airport';
  if (lane === 'med' || lane === 'nwe') return 'Often 5–12 days airport to airport';
  return 'Often 6–14 days airport to airport';
}

function seaTransit(lane: ShippingLane) {
  if (lane === 'gulf') return 'Often 4–12 days port to port';
  if (lane === 'southasia') return 'Often 5–14 days port to port';
  if (lane === 'asean') return 'Often 12–24 days port to port';
  if (lane === 'med' || lane === 'nwe') return 'Often 18–35 days port to port (Suez or Cape, as routed)';
  if (lane === 'usec' || lane === 'uswc') return 'Often 28–45 days port to port';
  return 'Often 16–40 days port to port';
}

function landTransit(lane: ShippingLane) {
  if (lane === 'gulf') return 'Often 6–14 days Karachi to the Gulf by road';
  if (lane === 'southasia') return 'Often 3–10 days on regional roads';
  return 'Road time depends on the named border';
}

function pkrFromUsd(usd: number, rate: number) {
  return Math.round(usd * rate);
}

function roundUsd(value: number) {
  const step = value < 400 ? 10 : value < 2_000 ? 25 : 50;
  return Math.max(step, Math.round(value / step) * step);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function trimNum(value: number) {
  return Number.isInteger(value) ? String(value) : String(Math.round(value * 10) / 10);
}
