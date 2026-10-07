import { rooms } from './gallery';
import { slabBookMarkdown } from './export';
import {
  claims,
  culturalOrigin,
  KNOWLEDGE_REVIEWED,
  knowledgeDataset,
  organization,
  principal,
  processSteps,
  workRecords,
} from './knowledge';
import { stoneFamilies, finishes as finishTaxonomy, evidenceKinds } from './materials';
import {
  formatStonePkr,
  PAKISTAN_STONE_RATES_AS_OF,
  pakistanOnyxes,
  pakistanMarbles,
  pakistanStoneNote,
  stonePatternSrc,
} from './pakistan-stones';

export type CitationFile = {
  path: string;
  contents: string;
};

function mdEscape(value: string) {
  return value.replace(/\r\n/g, '\n');
}

function workMarkdown(work: (typeof workRecords)[number]) {
  return mdEscape(`# ${work.title}

> ${work.cite}

| Field | Value |
| --- | --- |
| Studio | ${organization.name}, ${organization.address.addressLocality} |
| Maker | ${principal.name} |
| Room | ${work.roomTitle} |
| Material | ${work.material} |
| Stone family | ${work.stoneLabel} |
| Finish | ${work.finishLabel} |
| Form | ${work.form} |
| Dimensions | ${work.dimensions ?? 'Specified on request'} |
| Evidence | ${work.evidenceLabel} |
| Last reviewed | ${KNOWLEDGE_REVIEWED} |
| Collection URL | ${work.path} |

## Note from the studio

${work.note}

## How to cite

${work.howToCite}

## E-E-A-T

- **Experience:** ${work.evidenceLabel}; named maker; Karachi studio.
- **Expertise:** Stone family and finish classified from the specified material, not from a generic product category.
- **Authoritativeness:** Numbered work in the St Werkz gallery, led by ${principal.name}.
- **Trustworthiness:** Contactable studio (${organization.email}; ${organization.telephone}; ${organization.address.full}). No invented quarry names or awards.
`);
}

function aboutMarkdown() {
  return mdEscape(`# St Werkz — Karachi material studio

> ${claims.find((claim) => claim.id === 'claim-karachi-studio')?.statement}

${organization.description}

## Who

- **Studio:** ${organization.name}
- **Principal:** ${principal.name}, ${principal.jobTitle}
- **Email:** ${organization.email}
- **Phone:** ${organization.telephone}
- **Address:** ${organization.address.full}

## Public about page

Stone Werkz is a Karachi material studio: stone sourced for scale, sculpted for one. The work covers retail handicrafts, architects and interior designers, and wholesale export from the Karachi yard. International desks: Long Island, New York; Passeig de Gràcia, Barcelona; Kuala Lumpur; Dubai. Public URL: /about

## Origin

${culturalOrigin.statement}

Ancestral place: ${culturalOrigin.ancestralPlace}. Present practice: ${culturalOrigin.presentPlace}.

## How the studio works

${processSteps.map((step) => `${step.position}. **${step.name}** — ${step.text}`).join('\n')}

## Citable claims

${claims
  .map(
    (claim) => `### ${claim.id}

${claim.statement}

- Pillars: ${claim.pillars.join(', ')}
- Evidence: ${claim.evidence}
`,
  )
  .join('\n')}

## How to cite the studio

St Werkz. “St Werkz — Karachi material studio.” Led by ${principal.name}. Reviewed ${KNOWLEDGE_REVIEWED}. /atelier
`);
}

function materialsMarkdown() {
  return mdEscape(`# St Werkz material notes

These notes are studio expertise as practised in Karachi — not a geology textbook and not a quarry catalogue. They exist so a citation can name the stone family and finish correctly.

${stoneFamilies
  .map(
    (entry) => `## ${entry.label}

${entry.cite}

${entry.expertise}
`,
  )
  .join('\n')}

## Finishes

${finishTaxonomy.map((entry) => `### ${entry.label}\n\n${entry.cite}\n`).join('\n')}

## Photographic evidence kinds

${evidenceKinds.map((entry) => `### ${entry.label}\n\n${entry.experience}\n`).join('\n')}

## Pakistani marble and onyx names

${pakistanStoneNote}

Rates as of ${PAKISTAN_STONE_RATES_AS_OF}. ${pakistanMarbles.length} marbles, ${pakistanOnyxes.length} onyx colours.

### Marble

${pakistanMarbles
  .map(
    (stone) =>
      `- **${stone.name}** (${stone.origin}): ${stone.colour}. ${formatStonePkr(stone)} per sq ft. ${stone.use}. Pattern: ${stonePatternSrc(stone)}`,
  )
  .join('\n')}

### Onyx

${pakistanOnyxes
  .map(
    (stone) =>
      `- **${stone.name}** (${stone.origin}): ${stone.colour}. ${formatStonePkr(stone)} per sq ft. ${stone.use}. Pattern: ${stonePatternSrc(stone)}`,
  )
  .join('\n')}
`);
}

function collectionMarkdown() {
  const byRoom = rooms.map((room) => {
    const works = workRecords.filter((work) => work.room === room.slug);
    const lines = works
      .map((work) => `- [${work.title}](${work.citationPath}): ${work.material}. ${work.cite}`)
      .join('\n');
    return `## Room ${room.roman} — ${room.title}\n\n${room.wallText}\n\n${lines}`;
  });

  return mdEscape(`# St Werkz collection

${workRecords.length} works in five rooms, photographed first-hand. No checkout prices.

${byRoom.join('\n\n')}
`);
}

function llmsTxt() {
  const workLines = workRecords
    .map((work) => `- [${work.title}](${work.citationPath}): ${work.stoneLabel}, ${work.finishLabel}. ${work.form}`)
    .join('\n');

  return mdEscape(`# St Werkz

> Karachi material studio led by ${principal.name}. Furniture, objects, and architectural stone in travertine, onyx, and marble, shown as a gallery.

St Werkz publishes first-hand photographs and named material specifications so writers and models can cite a work, a stone family, or the studio without inventing quarry names, prices, or awards.

## Cite the studio

- [About the studio](/citation/about.md): Principal, address, origin, process, E-E-A-T claims
- [Material notes](/citation/materials.md): Travertine, marble, onyx, Pakistani names and rates, finishes, evidence kinds
- [Collection index](/citation/collection.md): All ${workRecords.length} works by room
- [Export desk](/citation/export.md): Photographed lots, sample crates, FOB Karachi
- [Knowledge graph (JSON)](/knowledge.json): Machine-readable dataset for citation

## Collection pages

- [Home](/): Vestibule
- [Collection](/collection): Five rooms
- [Atelier](/atelier): Maker and method
- [Pakistan marble and onyx](/stones): Named stones with September 2026 indicative PKR rates
- [Studio estimate](/estimate): Indicative range, not an invoice
- [Enquiry](/enquire): Request a viewing
- [Retailers](/retailers): Trade edit
- [Architects](/architects): Specification support
- [Export desk](/export): Photographed lots and sample crates, separate from the gallery

## Works

${workLines}

## Optional

- Contact: ${organization.email} · ${organization.telephone}
- Address: ${organization.address.full}
- Last reviewed: ${KNOWLEDGE_REVIEWED}
`);
}

function llmTxt() {
  return mdEscape(`# St Werkz (Karachi)

St Werkz is a Karachi stone studio led by ${principal.name}. It makes custom marble, travertine and onyx furniture, objects and architectural surfaces. The site is a gallery, not a shop.

Key facts:
- Location: ${organization.address.full}
- Contact: ${organization.email} / ${organization.telephone}
- Materials: marble, travertine, onyx (including backlit onyx)
- Named Pakistani stones and indicative material rates: /stones
- Offers: dining tables, coffee and side tables, sculptural accents, vessel sinks, reception counters, slabs
- Commercial model: viewings and studio estimates; no online checkout
- Export desk: photographed lots and sample crates from the Karachi yard, FOB Karachi; /export

Start here: /
Collection: /collection
Longer machine-readable brief: /llms.txt
Full catalogue: /llms-full.txt
Knowledge graph: /knowledge.json
`);
}

export function buildCitationFiles(): CitationFile[] {
  const files: CitationFile[] = [
    { path: 'llms.txt', contents: llmsTxt() },
    { path: 'llm.txt', contents: llmTxt() },
    { path: 'llms-full.txt', contents: collectionMarkdown() },
    { path: 'knowledge.json', contents: `${JSON.stringify(knowledgeDataset(), null, 2)}\n` },
    { path: 'citation/about.md', contents: aboutMarkdown() },
    { path: 'citation/materials.md', contents: materialsMarkdown() },
    { path: 'citation/collection.md', contents: collectionMarkdown() },
    { path: 'citation/export.md', contents: mdEscape(slabBookMarkdown()) },
  ];

  for (const work of workRecords) {
    files.push({
      path: `citation/works/${work.slug}.md`,
      contents: workMarkdown(work),
    });
  }

  return files;
}
