import { studio } from './gallery';

export type StudioFaq = {
  id: string;
  question: string;
  answer: string;
};

export const atelierSteps = [
  {
    name: 'Listen first',
    text: 'Tell us about the room, the light and what you want it to feel like.',
  },
  {
    name: 'Find the right cut',
    text: 'We look beyond the obvious: tone, grain, scale, edge and how the stone will age.',
  },
  {
    name: 'A first range',
    text: 'If you already have a size in mind, a studio estimate gives an indicative band — never a final price.',
  },
  {
    name: 'Make it real',
    text: 'Samples, honest guidance and a clear path from first conversation to installation.',
  },
] as const;

/** Visible FAQ + FAQPage JSON-LD. Answers are 40–60 words, speakable, no invented prices or ratings. */
export const studioFaqs: StudioFaq[] = [
  {
    id: 'what-stoneworks-makes',
    question: 'What does St Werkz make?',
    answer:
      'St Werkz makes stone furniture, objects, interiors and slabs in Karachi. The collection includes dining tables, coffee tables, sculptural accents, architectural counters and yard slabs, cut from travertine, onyx and marble. Works are shown as a gallery. Request a viewing to see a piece in person.',
  },
  {
    id: 'where-located',
    question: 'Where is St Werkz located?',
    answer: `St Werkz is located in Karachi, Pakistan, at ${studio.address}. Syed Rashid Ali leads the studio. Write ${studio.email} or call ${studio.phoneDisplay} to request a viewing or discuss a project. The studio is the starting point for households, architects and retailers.`,
  },
  {
    id: 'who-leads',
    question: 'Who leads St Werkz?',
    answer: `Syed Rashid Ali leads St Werkz, the Karachi stone studio. He takes material questions, project conversations and viewing requests. Call ${studio.phoneDisplay} or write ${studio.email}. The studio is at ${studio.address}.`,
  },
  {
    id: 'custom-or-collection',
    question: 'Does St Werkz make custom pieces or only the collection?',
    answer:
      'St Werkz shows a collection of finished works and also takes commissions. The five rooms — dining, living, accents, interiors and surfaces — are pieces you can request to see. If you need a similar table, sink or slab, start with a studio estimate. A viewing still confirms the stone.',
  },
  {
    id: 'how-to-view',
    question: 'How do I request a viewing at St Werkz?',
    answer: `To request a viewing at St Werkz, open the enquiry page, name a work or describe the room, and send a note. Syed Rashid Ali takes the message. You can also email ${studio.email} or call ${studio.phoneDisplay}. This is a studio conversation, not an online checkout.`,
  },
  {
    id: 'materials',
    question: 'What materials does St Werkz use?',
    answer:
      'St Werkz works in travertine, onyx and marble. Travertine is usually honed. Onyx is often polished and sometimes backlit. Marble appears in cream, sage, portoro and black with gold or white veining. Pakistani trade names — Ziarat White, Tavera, Black and Gold, green and honey onyx — are listed with rates on the stones page.',
  },
  {
    id: 'service-area',
    question: 'Does St Werkz work only in Karachi?',
    answer:
      'St Werkz is based in Karachi, Pakistan, and works from that studio with households, architects, interior designers and retailers. Projects usually begin with a viewing or a material conversation in Karachi. Remote notes are welcome by email or phone, then confirmed in person when the stone needs to be seen.',
  },
  {
    id: 'lead-times',
    question: 'How long does a commissioned piece take?',
    answer:
      'Lead times follow the stone. Objects and sinks are typically four to ten weeks after the stone is agreed. Tables are typically eight to fourteen weeks after the slab is reserved. Backlit onyx is often fourteen to twenty weeks. Architectural counters are often ten to sixteen weeks. A viewing confirms the stone.',
  },
  {
    id: 'origin',
    question: 'Where does St Werkz come from?',
    answer:
      'St Werkz is rooted in a family from Bandha in Allahabad, Uttar Pradesh. Migration carried music, painting and colour into the next generation. That inherited relationship with art now takes form in marble, onyx and travertine at the Karachi studio led by Syed Rashid Ali.',
  },
  {
    id: 'prices',
    question: 'Does St Werkz list prices online?',
    answer:
      'Collection works have no checkout prices. Named Pakistani marbles and onyx show indicative material rates on the stones page, as PKR per square foot — market bands, not a quotation. A studio estimate gives the range for a table, object or surface. After that, request a viewing so Syed Rashid Ali can confirm the stone.',
  },
  {
    id: 'pakistan-stones',
    question: 'Which marble and onyx names are available in Pakistan?',
    answer:
      'Pakistan quarries named marbles such as Ziarat White, Sunny Grey, Tavera, Badal and Black and Gold, plus onyx in green, honey, white and rarer pink or blue from Balochistan. The stones page lists September 2026 indicative PKR rates per square foot — material bands, not a finished-piece price. A Karachi viewing confirms the slab.',
  },
  {
    id: 'retailers',
    question: 'Does St Werkz work with retailers?',
    answer:
      'Yes. St Werkz supplies retailers with a considered edit of marble, onyx and travertine objects from its Karachi studio. Opening collections are shaped with the store, not dumped from a warehouse. Trade conversations start with Syed Rashid Ali at the North Nazimabad studio.',
  },
  {
    id: 'architects',
    question: 'Does St Werkz work with architects and interior designers?',
    answer:
      'Yes. St Werkz helps architects and interior designers specify travertine, onyx and marble from Karachi. Support runs from the first sample to the finished room. Bring a brief or a material question to Syed Rashid Ali. Samples and project conversations are welcome.',
  },
];
