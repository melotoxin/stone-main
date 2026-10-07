import { pieces, rooms, studio, pieceHref, type Piece, type RoomSlug } from './gallery';
import {
  evidenceKinds,
  finishes,
  stoneFamilies,
  type EeatPillar,
  type EvidenceKind,
  type FinishKind,
  type StoneFamily,
} from './materials';
import { pakistanStones } from './pakistan-stones';

/** ISO date this knowledge graph was last reviewed against the collection photographs. */
export const KNOWLEDGE_REVIEWED = '2026-09-04';

export type WorkStructure = {
  stoneFamily: StoneFamily;
  finish: FinishKind;
  evidence: EvidenceKind;
};

const worksStructure = {
  'oval-travertine-pedestal': { stoneFamily: 'travertine', finish: 'honed', evidence: 'interior' },
  'oval-travertine-assemblage': { stoneFamily: 'travertine', finish: 'honed', evidence: 'workshop' },
  'noir-gold-dining': { stoneFamily: 'marble', finish: 'polished', evidence: 'interior' },
  'portoro-slat-dining': { stoneFamily: 'marble', finish: 'polished', evidence: 'interior' },
  'cream-gathering-table': { stoneFamily: 'mixed', finish: 'polished', evidence: 'interior' },
  'sage-round-table': { stoneFamily: 'mixed', finish: 'polished', evidence: 'still-life' },
  'sage-onyx-organza': { stoneFamily: 'onyx', finish: 'polished', evidence: 'workshop' },
  'travertine-round-dining': { stoneFamily: 'travertine', finish: 'honed', evidence: 'interior' },
  'luminous-onyx-plinth': { stoneFamily: 'onyx', finish: 'backlit', evidence: 'interior' },
  'emerald-cage-table': { stoneFamily: 'onyx', finish: 'polished', evidence: 'still-life' },
  'sage-tulip-table': { stoneFamily: 'onyx', finish: 'polished', evidence: 'still-life' },
  'cream-companion-tables': { stoneFamily: 'mixed', finish: 'polished', evidence: 'still-life' },
  'travertine-cone-table': { stoneFamily: 'travertine', finish: 'honed', evidence: 'workshop' },
  'notched-joinery-tables': { stoneFamily: 'mixed', finish: 'honed', evidence: 'workshop' },
  'travertine-cross-table': { stoneFamily: 'travertine', finish: 'honed', evidence: 'interior' },
  'rust-cage-table': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'stepped-travertine-table': { stoneFamily: 'travertine', finish: 'honed', evidence: 'interior' },
  'nested-nero-tables': { stoneFamily: 'marble', finish: 'polished', evidence: 'interior' },
  'hex-pedestal-table': { stoneFamily: 'travertine', finish: 'honed', evidence: 'interior' },
  'monolith-coffee-table': { stoneFamily: 'travertine', finish: 'honed', evidence: 'interior' },
  'nero-gold-rim-table': { stoneFamily: 'marble', finish: 'polished', evidence: 'workshop' },
  'amber-showroom-table': { stoneFamily: 'mixed', finish: 'polished', evidence: 'workshop' },
  'ochre-pedestal-table': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'vessel-sink': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'coral-canister': { stoneFamily: 'mixed', finish: 'honed', evidence: 'still-life' },
  'travertine-candlesticks': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'pedestal-bowl': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'portoro-bookends': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'travertine-tray': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'desk-suite': { stoneFamily: 'mixed', finish: 'polished', evidence: 'still-life' },
  'nero-candles': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'scalloped-valet': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'curved-canisters': { stoneFamily: 'mixed', finish: 'honed', evidence: 'still-life' },
  'travertine-bath': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'tapered-vessel': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'round-tray': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'bulbous-vessel': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'onyx-urns': { stoneFamily: 'onyx', finish: 'polished', evidence: 'still-life' },
  'onyx-sphere-bowl': { stoneFamily: 'onyx', finish: 'polished', evidence: 'still-life' },
  'oblong-tray': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'nero-cylinder': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'coaster-suite': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'nero-disc-tray': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'hemisphere-candle': { stoneFamily: 'mixed', finish: 'honed', evidence: 'still-life' },
  'hotel-reception': { stoneFamily: 'travertine', finish: 'honed', evidence: 'interior' },
  'counter-glow': { stoneFamily: 'travertine', finish: 'honed', evidence: 'interior' },
  'onyx-waterfall': { stoneFamily: 'onyx', finish: 'backlit', evidence: 'interior' },
  'noir-gold-disc': { stoneFamily: 'marble', finish: 'polished', evidence: 'yard' },
  'nero-marquina-slabs': { stoneFamily: 'marble', finish: 'polished', evidence: 'yard' },
  'pill-travertine-dining': { stoneFamily: 'travertine', finish: 'honed', evidence: 'interior' },
  'nero-oval-wood-dining': { stoneFamily: 'marble', finish: 'polished', evidence: 'interior' },
  'portoro-pedestal-dining': { stoneFamily: 'marble', finish: 'polished', evidence: 'interior' },
  'nero-chrome-dining': { stoneFamily: 'marble', finish: 'polished', evidence: 'interior' },
  'nero-xframe-dining': { stoneFamily: 'marble', finish: 'polished', evidence: 'workshop' },
  'travertine-square-pedestal': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'sage-onyx-disc-table': { stoneFamily: 'onyx', finish: 'polished', evidence: 'still-life' },
  'sage-onyx-brass-table': { stoneFamily: 'onyx', finish: 'polished', evidence: 'still-life' },
  'cream-oval-plinth-table': { stoneFamily: 'mixed', finish: 'polished', evidence: 'still-life' },
  'linear-travertine-coffee': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'travertine-cube-table': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'travertine-tripod-coffee': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'travertine-block-side': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'travertine-walnut-coffee': { stoneFamily: 'mixed', finish: 'honed', evidence: 'still-life' },
  'travertine-drum-side': { stoneFamily: 'travertine', finish: 'honed', evidence: 'interior' },
  'travertine-cone-pedestal': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'travertine-c-table': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'banded-onyx-vase': { stoneFamily: 'onyx', finish: 'polished', evidence: 'still-life' },
  'portoro-cylinder-cup': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'tall-noir-vase': { stoneFamily: 'marble', finish: 'polished', evidence: 'interior' },
  'copper-vein-basin': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'travertine-compote': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'sage-onyx-pear-bowl': { stoneFamily: 'onyx', finish: 'polished', evidence: 'still-life' },
  'travertine-vanity-gold': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'travertine-bath-ensemble': { stoneFamily: 'travertine', finish: 'honed', evidence: 'still-life' },
  'portoro-bath-set': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'travertine-bath-seven': { stoneFamily: 'mixed', finish: 'honed', evidence: 'still-life' },
  'scalloped-onyx-bowl': { stoneFamily: 'onyx', finish: 'polished', evidence: 'still-life' },
  'sage-onyx-coasters': { stoneFamily: 'onyx', finish: 'polished', evidence: 'still-life' },
  'portoro-baluster-vase': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'terracotta-marble-urn': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'live-edge-onyx-vessel': { stoneFamily: 'onyx', finish: 'polished', evidence: 'still-life' },
  'pair-stone-pedestals': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'onyx-chess-casket': { stoneFamily: 'onyx', finish: 'polished', evidence: 'still-life' },
  'nero-chess-set': { stoneFamily: 'marble', finish: 'polished', evidence: 'still-life' },
  'viola-marble-fireplace': { stoneFamily: 'marble', finish: 'polished', evidence: 'interior' },
  'nero-marble-fireplace': { stoneFamily: 'marble', finish: 'polished', evidence: 'interior' },
  'portoro-workshop-mantel': { stoneFamily: 'marble', finish: 'polished', evidence: 'workshop' },
  'honey-quartzite-slab': { stoneFamily: 'mixed', finish: 'polished', evidence: 'yard' },
  'celadon-onyx-slab': { stoneFamily: 'onyx', finish: 'polished', evidence: 'yard' },
  'nero-calcite-lot': { stoneFamily: 'marble', finish: 'polished', evidence: 'yard' },
  'sage-rust-onyx-slab': { stoneFamily: 'onyx', finish: 'polished', evidence: 'yard' },
  'portoro-gold-lot': { stoneFamily: 'marble', finish: 'polished', evidence: 'yard' },
} as const satisfies Record<string, WorkStructure>;

export type CitableClaim = {
  id: string;
  statement: string;
  pillars: EeatPillar[];
  evidence: string;
  about: string;
};

export const organization = {
  name: 'St Werkz',
  legalName: 'St Werkz',
  alternateName: 'St Werkz Karachi',
  description:
    'St Werkz is a Karachi material studio making furniture, objects, and architectural stone from travertine, onyx, and marble. The collection is shown as a gallery, not as a shop floor.',
  email: studio.email,
  telephone: studio.phoneDisplay,
  telephoneHref: studio.phoneHref,
  address: {
    streetAddress: 'Suite A-104, First Floor, Bhayani Shopping Centre, Block-M, North Nazimabad',
    addressLocality: 'Karachi',
    addressRegion: 'Sindh',
    addressCountry: 'PK',
    full: studio.address,
  },
};

export const principal = {
  name: studio.name,
  jobTitle: 'Principal, St Werkz',
  description:
    'Syed Rashid Ali leads the Karachi studio. He is the named contact for material questions, viewings, and project conversations.',
  email: studio.email,
  telephone: studio.phoneDisplay,
};

export const culturalOrigin = {
  ancestralPlace: 'Bandha, Allahabad, Uttar Pradesh, India',
  presentPlace: 'Karachi, Pakistan',
  statement:
    'St Werkz is rooted in a family from Bandha in Allahabad, Uttar Pradesh. Through generations of migration the family carried music, painting, colour, and art; that inherited relationship with making now takes form in marble, onyx, and travertine in Karachi.',
};

export const processSteps: { position: number; name: string; text: string }[] = [
  { position: 1, name: 'Listen first', text: 'The room, the light, and what the surface should feel like — before a catalogue page.' },
  { position: 2, name: 'Find the right cut', text: 'Tone, grain, scale, edge, and how the stone will age, not only the obvious face.' },
  { position: 3, name: 'A first range', text: 'A studio estimate is an indicative band, never a final price or an invoice.' },
  { position: 4, name: 'Make it real', text: 'Samples, honest guidance, and a path from conversation to installation.' },
];

export const claims: CitableClaim[] = [
  {
    id: 'claim-karachi-studio',
    statement:
      'St Werkz is a material studio in Karachi, Pakistan, led by Syed Rashid Ali, making furniture and objects from travertine, onyx, and marble.',
    pillars: ['experience', 'authoritativeness', 'trustworthiness'],
    evidence: 'Named principal, published address in North Nazimabad, first-hand collection photographs.',
    about: 'organization',
  },
  {
    id: 'claim-gallery-not-cart',
    statement:
      'The St Werkz website presents a numbered gallery of works without checkout prices. A viewing or a studio estimate starts a conversation; it is not a cart.',
    pillars: ['trustworthiness'],
    evidence: 'Collection wall text; enquire and estimate flows.',
    about: 'organization',
  },
  {
    id: 'claim-family-origin',
    statement: culturalOrigin.statement,
    pillars: ['experience'],
    evidence: 'Studio origin account: Bandha, Allahabad; migration; Karachi practice.',
    about: 'principal',
  },
  {
    id: 'claim-direct-line',
    statement:
      'Material questions, project conversations, and first looks at works in the collection go to Syed Rashid Ali, not through an anonymous showroom desk.',
    pillars: ['experience', 'authoritativeness', 'trustworthiness'],
    evidence: 'Published phone and email on the atelier and enquiry pages.',
    about: 'principal',
  },
  {
    id: 'claim-travertine-honed',
    statement: stoneFamilies.find((entry) => entry.id === 'travertine')!.cite,
    pillars: ['expertise'],
    evidence: 'Collection material lines and honed travertine works in dining, living, accents, and interiors.',
    about: 'material:travertine',
  },
  {
    id: 'claim-onyx-backlit',
    statement: stoneFamilies.find((entry) => entry.id === 'onyx')!.cite,
    pillars: ['expertise', 'experience'],
    evidence: 'Luminous Onyx Plinth and Backlit Onyx Waterfall Counter, photographed as lit interiors.',
    about: 'material:onyx',
  },
  {
    id: 'claim-marble-figure',
    statement: stoneFamilies.find((entry) => entry.id === 'marble')!.cite,
    pillars: ['expertise'],
    evidence: 'Noir gold dining, Portoro slat table, Nero slabs and objects in the collection.',
    about: 'material:marble',
  },
  {
    id: 'claim-first-hand-photos',
    statement:
      'Every work in the published collection is documented with first-hand photography from the Karachi studio, yard, object still, or an installed interior — not stock imagery.',
    pillars: ['experience', 'trustworthiness'],
    evidence: 'Image paths under /gallery tied to named works.',
    about: 'dataset',
  },
  {
    id: 'claim-indicative-estimate',
    statement:
      'A St Werkz studio estimate is an indicative range in Pakistani rupees (with a conversation conversion to US dollars). It is not a bank rate, a quote, or an invoice.',
    pillars: ['trustworthiness', 'expertise'],
    evidence: 'Estimate tool copy and persisted brief language.',
    about: 'process',
  },
  {
    id: 'claim-nap',
    statement: `St Werkz may be reached at ${studio.email}, ${studio.phoneDisplay}, ${studio.address}.`,
    pillars: ['trustworthiness', 'authoritativeness'],
    evidence: 'Identical name, address, and phone on atelier, enquiry, trade, export, and footer.',
    about: 'organization',
  },
  {
    id: 'claim-export-desk',
    statement:
      'St Werkz discusses marble, onyx and travertine lots from its Karachi yard with importers and fabricators. A photographed lot and a sample crate come before a container. There is no published price list.',
    pillars: ['trustworthiness', 'expertise'],
    evidence: 'Export desk copy, slab-book legend, and first-hand yard photographs of Nero Vein Slabs and Noir Gold Circular Top.',
    about: 'process',
  },
];

export type WorkRecord = Piece &
  WorkStructure & {
    path: string;
    citationPath: string;
    cite: string;
    howToCite: string;
    stoneLabel: string;
    finishLabel: string;
    evidenceLabel: string;
    roomTitle: string;
  };

function evidenceLabel(id: EvidenceKind) {
  return evidenceKinds.find((entry) => entry.id === id)?.label ?? id;
}

function stoneLabel(id: StoneFamily) {
  return stoneFamilies.find((entry) => entry.id === id)?.label ?? id;
}

function finishLabel(id: FinishKind) {
  return finishes.find((entry) => entry.id === id)?.label ?? id;
}

export function getWorkStructure(slug: string): WorkStructure {
  const entry = worksStructure[slug as keyof typeof worksStructure];
  if (!entry) {
    throw new Error(`Missing EEAT structure for work "${slug}"`);
  }
  return entry;
}

export function citeStatement(piece: Piece, structure: WorkStructure) {
  const dim = piece.dimensions ? ` Dimensions: ${piece.dimensions}.` : '';
  return `${piece.title} is a ${piece.form} in ${piece.material}, made by St Werkz under ${principal.name} in Karachi.${dim} Evidence: ${evidenceLabel(structure.evidence).toLowerCase()}.`;
}

export function howToCite(piece: Piece) {
  return `St Werkz. “${piece.title}.” Collection, Karachi, reviewed ${KNOWLEDGE_REVIEWED}. ${pieceHref(piece)}`;
}

export function getWorkRecord(piece: Piece): WorkRecord {
  const structure = getWorkStructure(piece.slug);
  const room = rooms.find((entry) => entry.slug === piece.room);
  return {
    ...piece,
    ...structure,
    path: pieceHref(piece),
    citationPath: `/citation/works/${piece.slug}.md`,
    cite: citeStatement(piece, structure),
    howToCite: howToCite(piece),
    stoneLabel: stoneLabel(structure.stoneFamily),
    finishLabel: finishLabel(structure.finish),
    evidenceLabel: evidenceLabel(structure.evidence),
    roomTitle: room?.title ?? piece.room,
  };
}

export const workRecords: WorkRecord[] = pieces.map(getWorkRecord);

for (const piece of pieces) {
  getWorkStructure(piece.slug);
}

export function workRecordBySlug(slug: string) {
  return workRecords.find((entry) => entry.slug === slug);
}

export type KnowledgeDataset = {
  '@context': string;
  '@type': string;
  name: string;
  dateModified: string;
  eeat: Record<EeatPillar, CitableClaim[]>;
  organization: typeof organization;
  principal: typeof principal;
  origin: typeof culturalOrigin;
  materials: typeof stoneFamilies;
  pakistanStones: typeof pakistanStones;
  finishes: typeof finishes;
  evidence: typeof evidenceKinds;
  process: typeof processSteps;
  claims: CitableClaim[];
  rooms: { slug: RoomSlug; title: string; kicker: string; wallText: string; works: number }[];
  works: {
    slug: string;
    title: string;
    material: string;
    form: string;
    note: string;
    room: RoomSlug;
    dimensions?: string;
    stoneFamily: StoneFamily;
    finish: FinishKind;
    evidence: EvidenceKind;
    cite: string;
    howToCite: string;
    path: string;
    citationPath: string;
    images: string[];
  }[];
};

export function knowledgeDataset(): KnowledgeDataset {
  const pillars: EeatPillar[] = ['experience', 'expertise', 'authoritativeness', 'trustworthiness'];
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'St Werkz collection knowledge graph',
    dateModified: KNOWLEDGE_REVIEWED,
    eeat: Object.fromEntries(pillars.map((pillar) => [pillar, claims.filter((claim) => claim.pillars.includes(pillar))])) as KnowledgeDataset['eeat'],
    organization,
    principal,
    origin: culturalOrigin,
    materials: stoneFamilies,
    pakistanStones,
    finishes,
    evidence: evidenceKinds,
    process: processSteps,
    claims,
    rooms: rooms.map((room) => ({
      slug: room.slug,
      title: room.title,
      kicker: room.kicker,
      wallText: room.wallText,
      works: workRecords.filter((work) => work.room === room.slug).length,
    })),
    works: workRecords.map((work) => ({
      slug: work.slug,
      title: work.title,
      material: work.material,
      form: work.form,
      note: work.note,
      room: work.room,
      dimensions: work.dimensions,
      stoneFamily: work.stoneFamily,
      finish: work.finish,
      evidence: work.evidence,
      cite: work.cite,
      howToCite: work.howToCite,
      path: work.path,
      citationPath: work.citationPath,
      images: work.images,
    })),
  };
}
