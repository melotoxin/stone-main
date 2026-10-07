export type SpaceId = 'kitchen' | 'washroom' | 'home-decor';

export type RoomScene = {
  id: SpaceId;
  label: string;
  shortLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  srcSet: string;
  alt: string;
  width: number;
  height: number;
  position: string;
  credit: { author: string; sourceName: string; sourceUrl: string; licenseUrl: string };
};

// These are licensed room inspiration photos. Product photographs remain the ST WERKZ catalogue assets.
export const roomScenes: RoomScene[] = [
  {
    id: 'kitchen',
    label: 'Kitchen accessories',
    shortLabel: 'Kitchen',
    eyebrow: '01 / GATHER & SAVOUR',
    title: 'The heart of the home.',
    description: 'Bowls, serving trays, coasters and canisters. Natural stone for the rituals around your table.',
    image: '/design/spaces/kitchen-1800.webp',
    srcSet: '/design/spaces/kitchen-900.webp 900w, /design/spaces/kitchen-1440.webp 1440w, /design/spaces/kitchen-1800.webp 1800w',
    alt: 'Kitchen with a white veined marble island, grey cabinets, wooden stools and warm gold pendant lights',
    width: 1800,
    height: 1200,
    position: '50% 50%',
    credit: {
      author: 'Curtis Adams',
      sourceName: 'Pexels',
      sourceUrl: 'https://www.pexels.com/photo/a-kitchen-with-an-island-4800189/',
      licenseUrl: 'https://www.pexels.com/license/',
    },
  },
  {
    id: 'washroom',
    label: 'Washroom accessories',
    shortLabel: 'Washroom',
    eyebrow: '02 / PAUSE & RESTORE',
    title: 'A sanctuary in stone.',
    description: 'Basins, soap dishes, dispensers and vanity sets. Turn an everyday routine into a quiet moment of luxury.',
    image: '/design/spaces/washroom-1800.webp',
    srcSet: '/design/spaces/washroom-900.webp 900w, /design/spaces/washroom-1440.webp 1440w, /design/spaces/washroom-1800.webp 1800w',
    alt: 'Washroom with richly veined marble walls, a marble bath surround, a white vanity and dark marble floor',
    width: 1800,
    height: 1201,
    position: '50% 50%',
    credit: {
      author: 'Max Vakhtbovych',
      sourceName: 'Pexels',
      sourceUrl: 'https://www.pexels.com/photo/a-modern-bathroom-with-bathtub-7166641/',
      licenseUrl: 'https://www.pexels.com/license/',
    },
  },
  {
    id: 'home-decor',
    label: 'Room & home decor accessories',
    shortLabel: 'Room & home decor',
    eyebrow: '03 / LIVE & COLLECT',
    title: 'Objects that make it yours.',
    description: 'Expressive vases, sculptural vessels, candle holders and chess sets. Character for your living room and home.',
    image: '/design/spaces/home-decor-1800.webp',
    srcSet: '/design/spaces/home-decor-900.webp 900w, /design/spaces/home-decor-1440.webp 1440w, /design/spaces/home-decor-1800.webp 1800w',
    alt: 'Warm living room with a gold trimmed marble feature wall, display shelves, a stone coffee table and a cream sofa',
    width: 1800,
    height: 1200,
    position: '38% 50%',
    credit: {
      author: 'Ansar Muhammad',
      sourceName: 'Pexels',
      sourceUrl: 'https://www.pexels.com/photo/interior-design-of-living-room-20451394/',
      licenseUrl: 'https://www.pexels.com/license/',
    },
  },
];

export function productSpaceFromHash(hash: string): SpaceId | undefined {
  const id = hash.replace(/^#/, '');
  if (id === 'bathroom') return 'washroom';
  if (id === 'handicrafts') return 'home-decor';
  return roomScenes.find(scene => scene.id === id)?.id;
}
