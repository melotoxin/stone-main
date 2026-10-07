import { getPiece, getRoom } from '@/data/gallery';
import { getWorkRecord } from '@/data/knowledge';
import { stonePatternSrc } from '@/data/pakistan-stones';
import { getCatalog, LOCALES, localizedPiece, localizedRoom, prefixLocale, type LocaleCode } from '@/i18n';
import {
  aboutPageGraph,
  collectionIndexGraph,
  exportDeskGraph,
  faqPageGraph,
  homePageGraph,
  pieceGraph,
  roomGraph,
  stonesPageGraph,
} from '@/lib/schema';
import { clipMeta, DEFAULT_OG_IMAGE, staticMeta } from '@/lib/site';
import type { DocumentMetaInput } from '@/hooks/use-document-meta';

export type PageDocumentMeta = DocumentMetaInput & {
  jsonLd?: unknown;
};

type StaticKey = 'home' | 'collection' | 'atelier' | 'about' | 'enquire' | 'estimate' | 'retailers' | 'retail' | 'architects' | 'interiors' | 'export' | 'stones';

function viewingHowToGraph(locale: LocaleCode) {
  const t = getCatalog(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t.enquire.howToName,
    description: t.enquire.howToDescription,
    inLanguage: LOCALES[locale].htmlLang,
    step: t.enquire.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

const PRODUCTS_META: Record<LocaleCode, { title: string; description: string }> = {
  en: {
    title: 'Products — Marble, Onyx & Travertine Objects | St Werkz',
    description: 'Explore St Werkz kitchen accessories, washroom accessories and room & home decor accessories in marble, onyx and travertine, made in Karachi.',
  },
  es: {
    title: 'Productos — Objetos de mármol, ónix y travertino | St Werkz',
    description: 'Descubre los accesorios de cocina, baño y decoración del hogar de St Werkz en mármol, ónix y travertino, hechos en Karachi.',
  },
  it: {
    title: 'Prodotti — Oggetti in marmo, onice e travertino | St Werkz',
    description: 'Scopri gli accessori per cucina, bagno e arredo casa di St Werkz in marmo, onice e travertino, realizzati a Karachi.',
  },
  fr: {
    title: 'Produits — Objets en marbre, onyx et travertin | St Werkz',
    description: 'Découvrez les accessoires de cuisine, de salle de bain et de décoration de St Werkz en marbre, onyx et travertin, fabriqués à Karachi.',
  },
  ar: {
    title: 'المنتجات — قطع من الرخام والأونيكس والترافرتين | St Werkz',
    description: 'استكشف إكسسوارات المطبخ والحمام وديكور المنزل من St Werkz المصنوعة من الرخام والأونيكس والترافرتين في كراتشي.',
  },
  ur: {
    title: 'مصنوعات — سنگ مرمر، اونیکس اور ٹراورٹین کی اشیا | St Werkz',
    description: 'St Werkz کے کچن، غسل خانے اور گھر کی سجاوٹ کے لوازمات دیکھیں جو کراچی میں سنگ مرمر، اونیکس اور ٹراورٹین سے بنے ہیں۔',
  },
  ru: {
    title: 'Изделия — предметы из мрамора, оникса и травертина | St Werkz',
    description: 'Аксессуары St Werkz для кухни, ванной и декора дома из мрамора, оникса и травертина, изготовленные в Карачи.',
  },
};

function staticPage(key: StaticKey, locale: LocaleCode, jsonLd?: unknown): PageDocumentMeta {
  const t = getCatalog(locale);
  const page = staticMeta[key];
  return {
    title: t.seo.pages[key].title,
    description: t.seo.pages[key].description,
    path: prefixLocale(page.path, locale),
    locale,
    keywords: t.seo.pages[key].keywords ?? t.seo.keywords,
    jsonLd,
  };
}

export function documentMetaForPath(pathname: string, locale: LocaleCode = 'en'): PageDocumentMeta {
  const path = pathname.replace(/\/$/, '') || '/';
  const t = getCatalog(locale);

  if (path === '/') return staticPage('home', locale, homePageGraph(undefined, locale));
  if (path === '/collection') return staticPage('collection', locale, collectionIndexGraph(undefined, locale));
  if (path === '/products') {
    const { title, description } = PRODUCTS_META[locale];
    return {
      title,
      description,
      path: prefixLocale('/products', locale),
      locale,
      image: '/gallery/st-werkz/travertine-bath-ensemble-enhanced.webp',
      imageAlt: 'Handcrafted travertine washroom accessories by St Werkz',
      keywords: 'St Werkz products, marble kitchen accessories, stone washroom accessories, room and home decor accessories, marble home decor Karachi, onyx bowls, travertine bath set',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'St Werkz Products',
        description,
        inLanguage: LOCALES[locale].htmlLang,
        hasPart: [
          { '@type': 'WebPageElement', name: 'Kitchen accessories', identifier: 'kitchen' },
          { '@type': 'WebPageElement', name: 'Washroom accessories', identifier: 'washroom' },
          { '@type': 'WebPageElement', name: 'Room & home decor accessories', identifier: 'home-decor' },
        ],
      },
    };
  }
  if (path === '/atelier') return staticPage('atelier', locale, faqPageGraph(undefined, locale));
  if (path === '/about') return staticPage('about', locale, aboutPageGraph(undefined, locale));
  if (path === '/enquire') return staticPage('enquire', locale, viewingHowToGraph(locale));
  if (path === '/estimate') return staticPage('estimate', locale);
  if (path === '/retailers') return staticPage('retailers', locale);
  if (path === '/retail') return staticPage('retail', locale);
  if (path === '/architects') return staticPage('architects', locale);
  if (path === '/interiors') return staticPage('interiors', locale);
  if (path === '/export') return staticPage('export', locale, exportDeskGraph(undefined, locale));
  if (path === '/stones') {
    const stones = staticPage('stones', locale, stonesPageGraph(undefined, locale));
    return {
      ...stones,
      image: stonePatternSrc({ id: 'ziarat-white' }),
      imageAlt: t.stonesIndex.imageAlt('Ziarat White', 'Clean white with subtle grey vein'),
    };
  }

  const pieceMatch = path.match(/^\/collection\/([^/]+)\/([^/]+)$/);
  if (pieceMatch) {
    const room = getRoom(pieceMatch[1]);
    const piece = getPiece(pieceMatch[1], pieceMatch[2]);
    if (room && piece) {
      const localPiece = localizedPiece(piece, locale);
      const localRoom = localizedRoom(room, locale);
      const record = getWorkRecord(piece);
      const evidence = t.evidence[record.evidence];
      return {
        title: t.seo.pieceTitle(localPiece.title),
        description: clipMeta(
          t.seo.pieceCite(localPiece.title, localPiece.form, localPiece.material, evidence, localPiece.dimensions),
        ),
        path: prefixLocale(`/collection/${piece.room}/${piece.slug}`, locale),
        image: piece.images[0] ?? DEFAULT_OG_IMAGE,
        imageAlt: t.seo.pieceAlt(localPiece.title, localPiece.material),
        type: 'article',
        locale,
        keywords: t.seo.keywords,
        jsonLd: pieceGraph(localPiece, localRoom, undefined, locale),
      };
    }
  }

  const roomMatch = path.match(/^\/collection\/([^/]+)$/);
  if (roomMatch) {
    const room = getRoom(roomMatch[1]);
    if (room) {
      const localRoom = localizedRoom(room, locale);
      return {
        title: t.seo.roomTitle(localRoom.title),
        description: t.rooms[room.slug]?.description ?? clipMeta(localRoom.wallText),
        path: prefixLocale(`/collection/${room.slug}`, locale),
        locale,
        keywords: t.seo.keywords,
        jsonLd: roomGraph(localRoom, undefined, locale),
      };
    }
  }

  return {
    title: t.seo.pages.notFound.title,
    description: t.seo.pages.notFound.description,
    path: prefixLocale(path || '/', locale),
    locale,
    robots: staticMeta.notFound.robots,
  };
}
