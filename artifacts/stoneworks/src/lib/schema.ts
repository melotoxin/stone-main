import { pieces, rooms, studio, type Piece, type Room } from '@/data/gallery';
import { getWorkRecord, KNOWLEDGE_REVIEWED, knowledgeDataset, principal } from '@/data/knowledge';
import { formatStonePkr, pakistanStones, stonePatternSrc } from '@/data/pakistan-stones';
import { getCatalog, LOCALES, localizedPiece, prefixLocale, type LocaleCode } from '@/i18n';
import {
  absoluteUrl,
  business,
  DEFAULT_OG_IMAGE,
  getSiteOrigin,
  SITE_NAME,
  STUDIO_GEO,
} from '@/lib/site';

type JsonLd = Record<string, unknown>;

function href(path: string, locale: LocaleCode = 'en') {
  return absoluteUrl(prefixLocale(path, locale));
}

export function organizationId(origin = getSiteOrigin()) {
  return `${origin}/#organization`;
}

export function websiteId(origin = getSiteOrigin()) {
  return `${origin}/#website`;
}

export function principalId(origin = getSiteOrigin()) {
  return `${origin}/#principal`;
}

export function datasetId(origin = getSiteOrigin()) {
  return `${origin}/#dataset`;
}

export function postalAddress(): JsonLd {
  return {
    '@type': 'PostalAddress',
    streetAddress: business.streetAddress,
    addressLocality: business.addressLocality,
    addressRegion: business.addressRegion,
    addressCountry: business.addressCountry,
  };
}

export function organizationNode(origin = getSiteOrigin()): JsonLd {
  return {
    '@type': ['Organization', 'LocalBusiness', 'FurnitureStore'],
    '@id': organizationId(origin),
    name: business.brandName,
    legalName: business.legalName,
    alternateName: [...business.alternateNames],
    description: business.description,
    url: `${origin}/`,
    email: business.email,
    telephone: studio.phoneDisplay,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    logo: absoluteUrl('/favicon.svg'),
    founder: {
      '@id': principalId(origin),
    },
    employee: {
      '@id': principalId(origin),
    },
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: STUDIO_GEO.latitude,
      longitude: STUDIO_GEO.longitude,
    },
    areaServed: business.areaServed.map((name) => ({
      '@type': name === 'Pakistan' ? 'Country' : 'City',
      name,
    })),
    knowsAbout: [...business.knowsAbout],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'studio',
      telephone: studio.phoneDisplay,
      email: studio.email,
      areaServed: 'PK',
      availableLanguage: ['en', 'es', 'it', 'fr', 'ar', 'ur', 'ru'],
    },
  };
}

export function principalNode(origin = getSiteOrigin()): JsonLd {
  return {
    '@type': 'Person',
    '@id': principalId(origin),
    name: principal.name,
    jobTitle: principal.jobTitle,
    description: principal.description,
    email: principal.email,
    telephone: principal.telephone,
    worksFor: { '@id': organizationId(origin) },
    homeLocation: {
      '@type': 'Place',
      name: 'Karachi',
      address: postalAddress(),
    },
  };
}

export function datasetNode(origin = getSiteOrigin()): JsonLd {
  const data = knowledgeDataset();
  return {
    '@type': 'Dataset',
    '@id': datasetId(origin),
    name: data.name,
    description:
      'E-E-A-T structured records for the St Werkz Karachi collection: works, materials, process, and citable studio claims.',
    creator: { '@id': principalId(origin) },
    publisher: { '@id': organizationId(origin) },
    dateModified: KNOWLEDGE_REVIEWED,
    isAccessibleForFree: true,
    url: absoluteUrl('/knowledge.json'),
    license: 'All rights reserved. Facts may be quoted with attribution to St Werkz, Karachi.',
    variableMeasured: ['stone family', 'finish', 'form', 'room', 'evidence kind'],
  };
}

export function websiteNode(origin = getSiteOrigin(), locale: LocaleCode = 'en'): JsonLd {
  const t = getCatalog(locale);
  return {
    '@type': 'WebSite',
    '@id': websiteId(origin),
    name: SITE_NAME,
    alternateName: [...business.alternateNames],
    url: href('/', locale),
    description: t.seo.description,
    inLanguage: LOCALES[locale].htmlLang,
    publisher: { '@id': organizationId(origin) },
  };
}

export function siteGraph(origin = getSiteOrigin(), locale: LocaleCode = 'en'): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode(origin), principalNode(origin), websiteNode(origin, locale), datasetNode(origin)],
  };
}

export function breadcrumbList(
  items: { name: string; path: string }[],
  origin = getSiteOrigin(),
  locale: LocaleCode = 'en',
): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: href(item.path, locale),
    })),
  };
}

export function collectionIndexGraph(origin = getSiteOrigin(), locale: LocaleCode = 'en'): JsonLd {
  const t = getCatalog(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${href('/collection', locale)}#page`,
        name: t.chrome.collection,
        url: href('/collection', locale),
        inLanguage: LOCALES[locale].htmlLang,
        description: t.seo.pages.collection.description,
        isPartOf: { '@id': websiteId(origin) },
        about: { '@id': organizationId(origin) },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: rooms.length,
          itemListElement: rooms.map((room, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: t.rooms[room.slug].title,
            url: href(`/collection/${room.slug}`, locale),
          })),
        },
      },
      breadcrumbList(
        [
          { name: 'St Werkz', path: '/' },
          { name: t.chrome.collection, path: '/collection' },
        ],
        origin,
        locale,
      ),
    ],
  };
}

export function roomGraph(room: Room, origin = getSiteOrigin(), locale: LocaleCode = 'en'): JsonLd {
  const t = getCatalog(locale);
  const works = pieces.filter((piece) => piece.room === room.slug);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${href(`/collection/${room.slug}`, locale)}#page`,
        name: room.title,
        url: href(`/collection/${room.slug}`, locale),
        inLanguage: LOCALES[locale].htmlLang,
        description: room.wallText,
        isPartOf: { '@id': websiteId(origin) },
        about: { '@id': organizationId(origin) },
        mainEntity: {
          '@type': 'ItemList',
          name: room.title,
          numberOfItems: works.length,
          itemListElement: works.map((piece, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: localizedPiece(piece, locale).title,
            url: href(`/collection/${piece.room}/${piece.slug}`, locale),
          })),
        },
      },
      breadcrumbList(
        [
          { name: 'St Werkz', path: '/' },
          { name: t.chrome.collection, path: '/collection' },
          { name: room.title, path: `/collection/${room.slug}` },
        ],
        origin,
        locale,
      ),
    ],
  };
}

export function pieceGraph(piece: Piece, room: Room, origin = getSiteOrigin(), locale: LocaleCode = 'en'): JsonLd {
  const t = getCatalog(locale);
  const record = getWorkRecord(piece);
  const images = piece.images.map((image) => absoluteUrl(image));
  const url = href(`/collection/${piece.room}/${piece.slug}`, locale);
  const evidence = t.evidence[record.evidence];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Product', 'VisualArtwork'],
        '@id': `${url}#work`,
        name: piece.title,
        description: t.seo.pieceCite(piece.title, piece.form, piece.material, evidence, piece.dimensions),
        image: images,
        url,
        inLanguage: LOCALES[locale].htmlLang,
        brand: { '@id': organizationId(origin) },
        creator: { '@id': principalId(origin) },
        manufacturer: { '@id': organizationId(origin) },
        material: piece.material,
        category: room.title,
        artform: piece.form,
        artMedium: piece.material,
        ...(piece.dimensions ? { size: piece.dimensions } : {}),
        additionalProperty: [
          { '@type': 'PropertyValue', name: 'stoneFamily', value: record.stoneFamily },
          { '@type': 'PropertyValue', name: 'finish', value: record.finish },
          { '@type': 'PropertyValue', name: 'evidence', value: record.evidence },
        ],
        isPartOf: {
          '@type': 'Collection',
          name: room.title,
          url: href(`/collection/${room.slug}`, locale),
        },
      },
      breadcrumbList(
        [
          { name: 'St Werkz', path: '/' },
          { name: t.chrome.collection, path: '/collection' },
          { name: room.title, path: `/collection/${room.slug}` },
          { name: piece.title, path: `/collection/${piece.room}/${piece.slug}` },
        ],
        origin,
        locale,
      ),
    ],
  };
}

export function faqPageGraph(origin = getSiteOrigin(), locale: LocaleCode = 'en'): JsonLd {
  const t = getCatalog(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${href('/atelier', locale)}#faq`,
        url: href('/atelier', locale),
        inLanguage: LOCALES[locale].htmlLang,
        mainEntity: t.faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.speakable'],
        },
        isPartOf: { '@id': websiteId(origin) },
        about: { '@id': organizationId(origin) },
      },
      {
        '@type': 'HowTo',
        '@id': `${href('/atelier', locale)}#howto`,
        name: t.atelier.howTitleBefore + t.atelier.howTitleEm,
        description: t.definitions.studio,
        url: href('/atelier', locale),
        inLanguage: LOCALES[locale].htmlLang,
        step: t.atelier.process.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      },
    ],
  };
}

export function aboutPageGraph(origin = getSiteOrigin(), locale: LocaleCode = 'en'): JsonLd {
  const t = getCatalog(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${href('/about', locale)}#page`,
        name: t.chrome.about,
        url: href('/about', locale),
        inLanguage: LOCALES[locale].htmlLang,
        description: t.seo.pages.about.description,
        isPartOf: { '@id': websiteId(origin) },
        about: { '@id': organizationId(origin) },
        mainEntity: { '@id': organizationId(origin) },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.speakable'],
        },
      },
      breadcrumbList(
        [
          { name: SITE_NAME, path: '/' },
          { name: t.chrome.about, path: '/about' },
        ],
        origin,
        locale,
      ),
    ],
  };
}

export function homePageGraph(origin = getSiteOrigin(), locale: LocaleCode = 'en'): JsonLd {
  const t = getCatalog(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${href('/', locale)}#webpage`,
        url: href('/', locale),
        name: SITE_NAME,
        description: t.seo.description,
        inLanguage: LOCALES[locale].htmlLang,
        isPartOf: { '@id': websiteId(origin) },
        about: { '@id': organizationId(origin) },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.speakable'],
        },
      },
    ],
  };
}

export function exportDeskGraph(origin = getSiteOrigin(), locale: LocaleCode = 'en'): JsonLd {
  const t = getCatalog(locale);
  const desk = t.exportDesk;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HowTo',
        name: desk.howToName,
        description: desk.howToDescription,
        inLanguage: LOCALES[locale].htmlLang,
        step: desk.howTo.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      },
      {
        '@type': 'FAQPage',
        inLanguage: LOCALES[locale].htmlLang,
        mainEntity: desk.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };
}

export function stonesPageGraph(origin = getSiteOrigin(), locale: LocaleCode = 'en'): JsonLd {
  const t = getCatalog(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${href('/stones', locale)}#webpage`,
        url: href('/stones', locale),
        name: t.seo.pages.stones.title,
        description: t.seo.pages.stones.description,
        inLanguage: LOCALES[locale].htmlLang,
        isPartOf: { '@id': websiteId(origin) },
        about: { '@id': organizationId(origin) },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.speakable'],
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${href('/stones', locale)}#index`,
        name: t.stonesIndex.listName,
        description: t.stonesIndex.body,
        numberOfItems: pakistanStones.length,
        itemListElement: pakistanStones.map((stone, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: stone.name,
          description: t.stonesIndex.rateDescribe(stone.colour, stone.origin, formatStonePkr(stone)),
          image: absoluteUrl(stonePatternSrc(stone)),
          url: `${href('/stones', locale)}#${stone.id}`,
        })),
      },
    ],
  };
}
