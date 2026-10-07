import { studio } from './gallery';
import { workRecordBySlug } from './knowledge';

/** Quoteable 40–60 word lede for answer engines. Keep in sync with visible copy. */
export const exportDefinition =
  'St Werkz discusses marble, onyx and travertine lots from its Karachi yard with importers and fabricators. A photographed lot and a sample crate come before a container. There is no published price list. Syed Rashid Ali takes the conversation. Furniture and objects stay in the gallery.';

export const EXPORT_KEYWORDS =
  'marble slabs export Karachi, Pakistani onyx lots, travertine slabs FOB Karachi, figured marble Pakistan, St Werkz Karachi yard, Syed Rashid Ali';

export const EXPORT_OG_IMAGE = '/gallery/surfaces-nero-slab-b.jpg';
export const EXPORT_OG_IMAGE_ALT =
  'Tall polished black marble slabs with white calcite veining standing in the St Werkz yard, Karachi';

export const slabBookLegend =
  'These faces are first-hand photographs from the Karachi yard. They show how St Werkz records a lot. Availability, thickness, count and finish are confirmed in writing — this page is not a stock list and not a price list.';

export type ExportLot = {
  slug: string;
  family: string;
  status: string;
  href: string;
  image: string;
  title: string;
  material: string;
  note: string;
  alt: string;
};

function lotFromWork(slug: string, family: string, status: string): ExportLot {
  const work = workRecordBySlug(slug);
  if (!work) {
    throw new Error(`Export lot missing collection work "${slug}"`);
  }
  return {
    slug,
    family,
    status,
    href: work.path,
    image: work.images[0],
    title: work.title,
    material: work.material,
    note: work.note,
    alt: `${work.title} in ${work.material.charAt(0).toLowerCase()}${work.material.slice(1)}, photographed in the Karachi yard`,
  };
}

/** Yard evidence already in the collection — the first pages of a slab book, not invented inventory. */
export const exportLots: ExportLot[] = [
  lotFromWork('portoro-gold-lot', 'Figured marble', 'Yard evidence / collection'),
  lotFromWork('nero-calcite-lot', 'Figured marble', 'Yard evidence / collection'),
  lotFromWork('sage-rust-onyx-slab', 'Onyx', 'Yard evidence / collection'),
  lotFromWork('celadon-onyx-slab', 'Onyx', 'Yard evidence / collection'),
  lotFromWork('honey-quartzite-slab', 'Figured marble', 'Yard evidence / collection'),
  lotFromWork('nero-marquina-slabs', 'Figured marble', 'Yard evidence / collection'),
  lotFromWork('noir-gold-disc', 'Figured marble', 'Yard evidence / collection'),
];

export const lotFamilies = [
  {
    name: 'Figured marble',
    text: 'High-polish stone read by vein and contrast — including noir-gold and Nero-type white calcite. Named as figured marble, not as a foreign quarry.',
  },
  {
    name: 'Onyx',
    text: 'Translucent, banded stone. Backlight is reserved for slabs that allow it. Lots are discussed as faces first, lighting second.',
  },
  {
    name: 'Travertine',
    text: 'Usually specified honed, with natural pits left open rather than filled to a glass face. Linear bedding for counters, tops and architectural edges.',
  },
] as const;

export const exportPrinciples = [
  {
    number: '01',
    title: 'This desk is not the gallery',
    body: 'Tables, objects and rooms stay on the collection wall. This page is for photographed lots, sample crates and a conversation about stone that can travel.',
  },
  {
    number: '02',
    title: 'The face you see is the face we mean',
    body: 'Lots are recorded with first-hand yard photographs. Stock marble images and invented quarry names are not used.',
  },
  {
    number: '03',
    title: 'A crate before a container',
    body: 'A sample crate, then a first paid lot. Volume follows a repeat match of shade and finish — it is not promised in a headline.',
  },
] as const;

export type ExportStep = {
  number: string;
  name: string;
  text: string;
};

export const exportHowTo: ExportStep[] = [
  {
    number: '01',
    name: 'Name the stone and the port',
    text: 'Write which family you need — figured marble, onyx or travertine — the finish, and the destination port. Syed Rashid Ali takes the note.',
  },
  {
    number: '02',
    name: 'Read the photographed lot',
    text: 'The studio replies with faces from the yard, not a generic catalogue. If the stone is not in hand, that is said plainly.',
  },
  {
    number: '03',
    name: 'Ship a sample crate',
    text: 'A small crate of the agreed faces travels first. Feedback on shade and finish is collected before any container is discussed as a repeat.',
  },
  {
    number: '04',
    name: 'Then a first lot',
    text: 'A first paid lot is usually talked through as a mixed twenty-foot load of photographed slabs, FOB Karachi. Larger cadence waits on that arrival.',
  },
];

export const commercialTerms = [
  {
    title: 'Incoterms',
    body: 'Conversations start FOB Karachi unless another term is agreed in writing. Freight, insurance and destination charges are named separately.',
  },
  {
    title: 'Price',
    body: 'There is no published price list and no checkout. A range may be given for a named lot. It is not an invoice and not a bank quote.',
  },
  {
    title: 'Quantity',
    body: 'A sample crate comes first. A mixed twenty-foot load is a typical first conversation, not a minimum advertised to the internet.',
  },
  {
    title: 'What we will not claim',
    body: 'Italian origin, awards, identical next-container colour without lotting, or a volume we have not yet shipped together.',
  },
] as const;

export const qcOutline = [
  {
    title: 'Shade lotting',
    body: 'Faces that will travel together are grouped by eye from the yard photographs, then confirmed before packing.',
  },
  {
    title: 'Finish',
    body: 'Honed, polished, or backlight on onyx only. The finish is named on the lot, not assumed from a moodboard.',
  },
  {
    title: 'Measure',
    body: 'Thickness, calibration and count are stated per lot in writing. They are not printed as a standing catalogue.',
  },
  {
    title: 'Fill and resin',
    body: 'What is filled, and what is left open — especially on travertine — is said before the crate leaves.',
  },
  {
    title: 'Packing',
    body: 'Edge protection, crate method and loading can be filmed from the yard for a serious buyer. A packing film is made for that conversation; it is not a stock clip.',
  },
  {
    title: 'Refusal',
    body: 'Unnamed mixed lots sold as one shade, quarry names we cannot stand behind, and stone we have not photographed will not be offered.',
  },
] as const;

export const exportFaqs = [
  {
    id: 'what-is-export-desk',
    question: 'Is this the same as buying a table from St Werkz?',
    answer:
      'No. The collection is a gallery of furniture, objects and architectural pieces, shown by viewing. The export desk is for photographed lots of marble, onyx and travertine discussed as stone that can travel. Both conversations go to Syed Rashid Ali.',
  },
  {
    id: 'do-you-publish-stock',
    question: 'Do you publish a live stock list?',
    answer:
      'No. The slab book on this page shows how lots are recorded, using first-hand yard photographs already in the collection. Current faces, thickness and count are confirmed in writing for the buyer who asks. It is not a warehouse dump and not a price list.',
  },
  {
    id: 'how-to-start-lot',
    question: 'How do I start an export conversation?',
    answer: `Write ${studio.email} or use the form on this page. Name the stone family, the finish and the destination port. Syed Rashid Ali replies with photographed faces or an honest note if the stone is not in hand. A sample crate comes before a container.`,
  },
  {
    id: 'fob-karachi',
    question: 'What shipping terms does St Werkz use?',
    answer:
      'Conversations start FOB Karachi unless another term is agreed in writing. The studio is in North Nazimabad, Karachi. Freight, insurance and charges after the port are named separately. There is no published freight rate on this site.',
  },
];

export function exportMailto(fields: {
  name: string;
  company: string;
  email: string;
  port: string;
  stone: string;
  message: string;
}) {
  const body = [
    `Name: ${fields.name}`,
    `Company: ${fields.company}`,
    `Reply to: ${fields.email}`,
    `Destination port: ${fields.port}`,
    `Stone family: ${fields.stone}`,
    '',
    fields.message,
  ].join('\n');
  const subject = fields.company
    ? `Export lot — ${fields.company}`
    : 'Export lot — St Werkz';
  return `${studio.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function exportHowToJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to request a St Werkz export lot from Karachi',
    description:
      'Request photographed marble, onyx or travertine lots from the St Werkz yard in Karachi. A sample crate comes before a container. This is not an online checkout.',
    step: exportHowTo.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function exportFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: exportFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function exportPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [exportHowToJsonLd(), exportFaqJsonLd()],
  };
}

export function slabBookMarkdown() {
  const lotBlocks = exportLots
    .map((lot) => {
      return `### ${lot.title}

- Family: ${lot.family}
- Status: ${lot.status}
- Material: ${lot.material}
- Collection: ${lot.href}
- Photograph: ${lot.image}

${lot.note}
`;
    })
    .join('\n');

  const familyBlocks = lotFamilies.map((entry) => `### ${entry.name}\n\n${entry.text}\n`).join('\n');
  const stepBlocks = exportHowTo.map((step) => `${step.number}. **${step.name}** — ${step.text}`).join('\n');
  const termBlocks = commercialTerms.map((term) => `### ${term.title}\n\n${term.body}\n`).join('\n');
  const qcBlocks = qcOutline.map((item) => `### ${item.title}\n\n${item.body}\n`).join('\n');

  return `# St Werkz export desk — Karachi yard lots

> ${exportDefinition}

This page is separate from the gallery. Furniture, objects and rooms stay in the collection. Export conversations are about photographed lots, sample crates, and stone that can travel.

## Legend

${slabBookLegend}

## Photographed lots now on record

${lotBlocks}

## Stone families discussed as lots

${familyBlocks}

## How a first lot starts

${stepBlocks}

## Commercial terms

${termBlocks}

## Quality checklist (named before packing)

${qcBlocks}

## Contact

- Principal: ${studio.name}
- Email: ${studio.email}
- Phone: ${studio.phoneDisplay}
- Address: ${studio.address}
- Page: /export
- Citation: /citation/export.md

Do not cite invented quarry names, awards, prices, or a live stock count from this file.
`;
}
