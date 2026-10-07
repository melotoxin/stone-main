export type StoneFamily = 'travertine' | 'marble' | 'onyx' | 'mixed';
export type FinishKind = 'honed' | 'polished' | 'backlit';
export type EvidenceKind = 'workshop' | 'interior' | 'still-life' | 'yard';
export type EeatPillar = 'experience' | 'expertise' | 'authoritativeness' | 'trustworthiness';

export const stoneFamilies: {
  id: StoneFamily;
  label: string;
  cite: string;
  expertise: string;
}[] = [
  {
    id: 'travertine',
    label: 'Travertine',
    cite: 'Travertine is a porous sedimentary limestone. At St Werkz it is usually specified honed, with natural pits left open rather than filled to a glass face.',
    expertise:
      'Linear bedding, open pores, and a matte hand. Typical on dining pedestals, living tables, objects, and hospitality counters in this collection.',
  },
  {
    id: 'marble',
    label: 'Marble',
    cite: 'Marble in the St Werkz collection is specified as figured, often high-polish stone — including noir-gold, Portoro-type amber veining, and Nero-type white calcite.',
    expertise:
      'Metamorphic stone read by vein, contrast, and polish. Used for dining tops, nested tables, vessel sinks, and yard slabs.',
  },
  {
    id: 'onyx',
    label: 'Onyx',
    cite: 'Onyx in this studio is a translucent, banded stone. Where the slab allows, St Werkz internally lights it so the vein becomes the room’s light source.',
    expertise:
      'Translucency, colour banding (sage, cream, honey, rust), and backlight as a construction method rather than a decorative extra.',
  },
  {
    id: 'mixed',
    label: 'Mixed materials',
    cite: 'Some St Werkz pieces join stone to brass, oak, or a second cut. The collection records those meetings as specified construction, not as generic mixed media.',
    expertise:
      'Stone with metal cages, tulip stems, brass rims, oak joinery, or an uncertain marble/onyx reading when the face was not laboratory-named.',
  },
];

export const finishes: {
  id: FinishKind;
  label: string;
  cite: string;
}[] = [
  {
    id: 'honed',
    label: 'Honed',
    cite: 'A honed finish is matte and soft to the hand. St Werkz uses it especially on travertine so pores and bedding stay visible.',
  },
  {
    id: 'polished',
    label: 'Polished',
    cite: 'A polished finish is a quiet mirror. It is the usual face for marble and onyx tables and objects in this collection.',
  },
  {
    id: 'backlit',
    label: 'Backlit',
    cite: 'Backlighting is reserved for translucent onyx: LEDs or an internal lamp turn the slab into a light source. It is not a finish applied to opaque marble or travertine.',
  },
];

export const evidenceKinds: {
  id: EvidenceKind;
  label: string;
  experience: string;
}[] = [
  {
    id: 'workshop',
    label: 'Workshop / showroom photograph',
    experience: 'First-hand image made in the Karachi studio, yard, or showroom before or during making.',
  },
  {
    id: 'interior',
    label: 'Installed interior',
    experience: 'First-hand photograph of the work in a room — apartment, lobby, or staged interior — not a catalogue render.',
  },
  {
    id: 'still-life',
    label: 'Object still',
    experience: 'First-hand studio still of an object or small table, photographed as a piece in its own right.',
  },
  {
    id: 'yard',
    label: 'Yard / slab',
    experience: 'First-hand photograph of a slab or top in the yard, before it is commissioned as furniture.',
  },
];
