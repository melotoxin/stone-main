import type { LocaleCode } from '@/i18n/locales';
import { studio } from './gallery';

/* ============================================================================
 * B2B / foreign-buyer configuration for St Werkz.
 *
 * Everything a non-developer may need to edit for the US-market landing pages
 * lives here: mission copy, US office slots, pricing visibility and quote CTA.
 * ========================================================================== */

/**
 * Direct price display (PKR/USD rate bands, the studio estimator) is hidden for
 * B2B buyers. Flip to `true` to restore the indicative-rate UI everywhere.
 */
export const SHOW_PRICING = false;

/** Every "Request Pricing" / "Inquire for Quote" button lands here. */
export const QUOTE_PATH = '/enquire';

export function quoteHref(article?: { code: string; name: string }): string {
  const params = new URLSearchParams({ intent: 'quote' });
  if (article) {
    params.set('article', article.code);
    params.set('name', article.name);
  }
  return `${QUOTE_PATH}?${params.toString()}`;
}

/* ----------------------------------------------------------------------------
 * USA office — dedicated slots.
 *
 * Fill these in when the US address and number are confirmed. Empty strings are
 * rendered as a neutral "coming soon" line rather than an invented contact, so
 * nothing false is ever published (and Google Ads never sees a dead number).
 * -------------------------------------------------------------------------- */
export const usaOffice = {
  /** e.g. '123 Main Street, Suite 400, Garden City, NY 11530' */
  streetAddress: '',
  /** Shown when `streetAddress` is empty — the existing, confirmed desk location. */
  areaFallback: 'Long Island, New York',
  country: 'United States',
  /** Human-readable, e.g. '+1 (516) 555-0100' */
  phoneDisplay: '',
  /** Dial string, e.g. 'tel:+15165550100' */
  phoneHref: '',
  /** Optional US-desk mailbox; falls back to the studio email. */
  email: '',
} as const;

export function usaOfficeAddress(): string {
  return usaOffice.streetAddress || usaOffice.areaFallback;
}

export function usaOfficeEmail(): { display: string; href: string } {
  const email = usaOffice.email || studio.email;
  return { display: email, href: `mailto:${email}` };
}

export const headOffice = {
  label: 'Karachi HQ & Yard',
  address: studio.address,
  phoneDisplay: studio.phoneDisplay,
  phoneHref: studio.phoneHref,
  email: studio.email,
  emailHref: studio.emailHref,
} as const;

/* ----------------------------------------------------------------------------
 * Mission, vision and short B2B UI labels (localised; English is the source).
 * -------------------------------------------------------------------------- */
export type B2BCopy = {
  missionLabel: string;
  purposeLabel: string;
  focusStatement: string;
  brandCore: string;
  requestPricing: string;
  inquireForQuote: string;
  exploreProducts: string;
  products: string;
  portfolio: string;
  usaOffice: string;
  usaContact: string;
  headOffice: string;
  comingSoon: string;
};

const en: B2BCopy = {
  missionLabel: 'Our mission',
  purposeLabel: 'Our purpose',
  focusStatement:
    'Delivering exceptional customer value through our premium collection of Marble, Onyx, and Limestone tiles, slabs, and handicrafts.',
  brandCore: 'Customer Value & Business Growth',
  requestPricing: 'Request Pricing',
  inquireForQuote: 'Inquire for Quote',
  exploreProducts: 'Explore Products',
  products: 'Products',
  portfolio: 'Portfolio',
  usaOffice: 'USA Office',
  usaContact: 'USA Contact',
  headOffice: 'Karachi HQ',
  comingSoon: 'Line opening soon',
};

const b2bCopy: Record<LocaleCode, B2BCopy> = {
  en,
  es: {
    missionLabel: 'Nuestra misión',
    purposeLabel: 'Nuestro propósito',
    focusStatement:
      'Ofrecemos un valor excepcional al cliente a través de nuestra colección premium de baldosas, losas y artesanías de mármol, ónix y piedra caliza.',
    brandCore: 'Valor para el cliente y crecimiento empresarial',
    requestPricing: 'Solicitar precios',
    inquireForQuote: 'Solicitar cotización',
    exploreProducts: 'Ver productos',
    products: 'Productos',
    portfolio: 'Portafolio',
    usaOffice: 'Oficina en EE. UU.',
    usaContact: 'Contacto EE. UU.',
    headOffice: 'Sede en Karachi',
    comingSoon: 'Línea disponible pronto',
  },
  it: {
    missionLabel: 'La nostra missione',
    purposeLabel: 'Il nostro scopo',
    focusStatement:
      'Offriamo un valore eccezionale al cliente con la nostra collezione premium di piastrelle, lastre e manufatti artigianali in marmo, onice e pietra calcarea.',
    brandCore: 'Valore per il cliente e crescita del business',
    requestPricing: 'Richiedi i prezzi',
    inquireForQuote: 'Richiedi un preventivo',
    exploreProducts: 'Scopri i prodotti',
    products: 'Prodotti',
    portfolio: 'Portfolio',
    usaOffice: 'Ufficio USA',
    usaContact: 'Contatto USA',
    headOffice: 'Sede di Karachi',
    comingSoon: 'Linea in arrivo',
  },
  fr: {
    missionLabel: 'Notre mission',
    purposeLabel: 'Notre raison d’être',
    focusStatement:
      'Offrir une valeur client exceptionnelle grâce à notre collection premium de carreaux, tranches et objets artisanaux en marbre, onyx et calcaire.',
    brandCore: 'Valeur client et croissance des affaires',
    requestPricing: 'Demander les prix',
    inquireForQuote: 'Demander un devis',
    exploreProducts: 'Voir les produits',
    products: 'Produits',
    portfolio: 'Portfolio',
    usaOffice: 'Bureau aux États-Unis',
    usaContact: 'Contact États-Unis',
    headOffice: 'Siège à Karachi',
    comingSoon: 'Ligne bientôt disponible',
  },
  ar: {
    missionLabel: 'رسالتنا',
    purposeLabel: 'غايتنا',
    focusStatement:
      'نقدّم قيمة استثنائية لعملائنا من خلال مجموعتنا المميزة من بلاط وألواح ومشغولات الرخام والأونيكس والحجر الجيري.',
    brandCore: 'قيمة العميل ونمو الأعمال',
    requestPricing: 'اطلب الأسعار',
    inquireForQuote: 'اطلب عرض سعر',
    exploreProducts: 'تصفّح المنتجات',
    products: 'المنتجات',
    portfolio: 'أعمالنا',
    usaOffice: 'مكتب الولايات المتحدة',
    usaContact: 'رقم الولايات المتحدة',
    headOffice: 'المقر في كراتشي',
    comingSoon: 'الخط قريبًا',
  },
  ur: {
    missionLabel: 'ہمارا مشن',
    purposeLabel: 'ہمارا مقصد',
    focusStatement:
      'ماربل، اونکس اور لائم اسٹون کی ٹائلز، سلیبز اور دستکاری کے پریمیم کلیکشن کے ذریعے اپنے صارفین کو غیر معمولی قدر فراہم کرنا۔',
    brandCore: 'صارف کی قدر اور کاروباری ترقی',
    requestPricing: 'قیمت معلوم کریں',
    inquireForQuote: 'کوٹیشن طلب کریں',
    exploreProducts: 'مصنوعات دیکھیں',
    products: 'مصنوعات',
    portfolio: 'پورٹ فولیو',
    usaOffice: 'امریکہ آفس',
    usaContact: 'امریکہ رابطہ',
    headOffice: 'کراچی ہیڈ آفس',
    comingSoon: 'لائن جلد دستیاب',
  },
  ru: {
    missionLabel: 'Наша миссия',
    purposeLabel: 'Наша цель',
    focusStatement:
      'Мы создаём исключительную ценность для клиентов благодаря премиальной коллекции плитки, слэбов и изделий ручной работы из мрамора, оникса и известняка.',
    brandCore: 'Ценность для клиента и рост бизнеса',
    requestPricing: 'Запросить цены',
    inquireForQuote: 'Запросить предложение',
    exploreProducts: 'Каталог продукции',
    products: 'Продукция',
    portfolio: 'Портфолио',
    usaOffice: 'Офис в США',
    usaContact: 'Контакт в США',
    headOffice: 'Штаб-квартира в Карачи',
    comingSoon: 'Линия скоро откроется',
  },
};

export function getB2BCopy(locale: LocaleCode): B2BCopy {
  return b2bCopy[locale] ?? en;
}
