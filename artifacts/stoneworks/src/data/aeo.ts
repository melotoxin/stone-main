import { studioFaqs } from './faq';
import { studio } from './gallery';

export { studioFaqs };

/** Quoteable 40–60 word lede for answer engines. Keep in sync with visible copy. */
export const studioDefinition =
  'St Werkz is a Karachi stone studio led by Syed Rashid Ali. The studio makes furniture, objects, interiors and slabs from travertine, onyx and marble. The collection is hung in five rooms and shown by viewing, not sold from a cart. There are no prices on the wall.';

export const estimateDefinition =
  'A St Werkz studio estimate is an indicative range in PKR based on size, stone and form. It is not a price, a quote or a checkout. Every slab is unique. A viewing at the Karachi studio confirms the stone before a commission proceeds.';

export const collectionDefinition =
  'The St Werkz collection is five rooms of stone — dining, living, accents, interiors and surfaces — shown in Karachi as a gallery. Each room has wall text and works hung with space around them. Request a viewing to see a piece in person.';

export const retailerDefinition =
  'St Werkz supplies retailers with a considered edit of marble, onyx and travertine objects from its Karachi studio. Opening collections are shaped with the store, not dumped from a warehouse. Trade conversations start with Syed Rashid Ali.';

export const architectDefinition =
  'St Werkz helps architects and interior designers specify travertine, onyx and marble from Karachi. Support runs from the first sample to the finished room. Bring a brief or a material question to Syed Rashid Ali.';

export function pieceDefinition(title: string, material: string, form: string, roomTitle: string) {
  return `${title} is a St Werkz work in ${material}, from the ${roomTitle} room in Karachi. ${form}.`;
}

export function roomDefinition(title: string, wallText: string) {
  return `${title} is a room in the St Werkz collection in Karachi. ${wallText}`;
}

export type ViewingStep = {
  number: string;
  name: string;
  text: string;
};

export const viewingHowTo: ViewingStep[] = [
  {
    number: '01',
    name: 'Choose a work, or describe the room',
    text: 'Walk the collection and name the piece you want to see, or tell the studio about the room, the light and the surface you need.',
  },
  {
    number: '02',
    name: 'Optional: take a studio estimate',
    text: 'If you already have a size in mind, a studio estimate returns an indicative range in PKR. It is not a price and not a checkout.',
  },
  {
    number: '03',
    name: 'Send a note to the studio',
    text: `Use the enquiry form, write ${studio.email}, or call ${studio.phoneDisplay}. Syed Rashid Ali takes the message.`,
  },
  {
    number: '04',
    name: 'See the stone in Karachi',
    text: `Visit ${studio.address}. A viewing confirms the slab before anything is commissioned or reserved.`,
  },
];

export function faqPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: studioFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function viewingHowToJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to request a viewing at St Werkz',
    description:
      'Request a viewing of stone furniture, objects or slabs at the St Werkz studio in Karachi. This is a studio conversation, not an online checkout.',
    step: viewingHowTo.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
