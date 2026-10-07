import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link } from 'wouter';
import { StoneworksMark } from '@/components/brand/StoneworksMark';
import { PoweredByCredit } from '@/components/layout/PoweredByCredit';
import { DocumentMeta } from '@/components/seo/DocumentMeta';
import { ServiceHeader } from '@/components/layout/ServiceHeader';
import { LanguageSwitcher, localizedPiece, useI18n } from '@/i18n';
import { pieceHref, pieces, studio } from '@/data/gallery';
import { documentMetaForPath } from '@/lib/page-meta';
import type { ProjectLandingCopy } from '@/i18n/types';
import { originalCatalogImage } from '@/data/editorial-media';
import '@/styles/service-refinements.css';

type TradeAudience = 'retailers' | 'architects' | 'interiors';

type TradePageProps = {
  audience: TradeAudience;
};

const retailerProducts = [
  { image: '/gallery/accents-coral-canister-enhanced.webp', name: 'Coral-Lid Travertine Canister', note: 'Sculptural accents' },
  { image: '/gallery/accents-travertine-bath-enhanced.webp', name: 'Travertine Bath Suite', note: 'Quiet daily luxury' },
  { image: '/gallery/accents-portoro-bookends-enhanced.webp', name: 'Portoro Bookends', note: 'Desk and living' },
  { image: '/gallery/accents-desk-suite-enhanced.webp', name: 'Midnight Marble Desk Suite', note: 'Useful, elevated' },
];

const architectProducts = [
  { image: '/gallery/accents-vessel-sink-enhanced.webp', name: 'Noir Gold Vessel Sink', note: 'Countertop / bath' },
  { image: '/gallery/interiors-onyx-waterfall-enhanced.webp', name: 'Backlit Onyx Waterfall', note: 'A strong first detail' },
  { image: '/gallery/living-emerald-cage-enhanced.webp', name: 'Emerald Cage Table', note: 'Furniture / feature' },
  { image: '/gallery/accents-onyx-urns-enhanced.webp', name: 'Pair of Onyx Urns', note: 'Object / accent' },
];

const interiorProducts = [
  { image: '/gallery/accents-onyx-urns-enhanced.webp', name: 'Pair of Onyx Urns', note: 'Object / accent' },
  { image: '/gallery/living-luminous-onyx-a-enhanced.webp', name: 'Luminous Onyx Plinth', note: 'Living / light' },
  { image: '/gallery/interiors-onyx-waterfall-enhanced.webp', name: 'Backlit Onyx Waterfall', note: 'Surface / feature' },
  { image: '/gallery/interiors-hotel-reception-enhanced.webp', name: 'Travertine Reception', note: 'Room-scale stone' },
];

function TradeHeader() {
  const { t } = useI18n();
  return <ServiceHeader kind="trade" contactHref="#trade-contact" contactLabel={t.retailers.startConversation} mobileContactLabel={t.retailers.enquire} />;
}

function TradeFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-white/15 bg-[#111111] px-6 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-white sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 text-[10px] uppercase tracking-[.16em] text-white/45 sm:flex-row sm:items-center">
        <Link href="/" className="self-start normal-case tracking-normal">
          <StoneworksMark variant="onDark" markSize={36} />
        </Link>
        <p>{t.retailers.footerTag}</p>
        <a href="#top" className="line-link self-start sm:self-auto">{t.retailers.backToTop}</a>
      </div>
      <div className="mx-auto mt-6 flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <LanguageSwitcher variant="footer" />
        <PoweredByCredit />
      </div>
    </footer>
  );
}

function ProductStrip({ products }: { products: { image: string; name: string; note: string }[] }) {
  const { locale } = useI18n();
  return (
    <div className="trade-product-strip">
      {products.map((product, index) => {
        const image = originalCatalogImage(product.image);
        const source = pieces.find(piece => piece.images.includes(image));
        const local = source ? localizedPiece(source, locale) : undefined;
        return <Link href={source ? pieceHref(source) : '/products'} key={product.name} className="trade-product group" data-testid={`link-trade-product-${index + 1}`}>
          <div className="trade-product__photo"><img src={image} alt={local?.title ?? product.name} width={736} height={736} loading="lazy" decoding="async" /><ArrowUpRight size={20} aria-hidden="true" /></div>
          <p className="trade-product__code">{source?.code ?? String(index + 1).padStart(2, '0')}</p>
          <h3 className="font-display text-2xl leading-tight">{local?.title ?? product.name}</h3>
          <p className="trade-product__note">{product.note}</p>
        </Link>;
      })}
    </div>
  );
}

function TradePhotograph({ slug, image }: { slug: string; image?: string }) {
  const { locale } = useI18n();
  const source = pieces.find(piece => piece.slug === slug)!;
  const piece = localizedPiece(source, locale);
  return <figure className="trade-hero__photograph"><Link href={pieceHref(source)}><img src={image ?? source.images[0]} alt={`${piece.title} — ${piece.material}`} fetchPriority="high" decoding="async" /><figcaption><span>{source.code}</span><span>{piece.title}</span><ArrowUpRight size={17} aria-hidden="true" /></figcaption></Link></figure>;
}

function projectCopy(audience: Exclude<TradeAudience, 'retailers'>, t: ReturnType<typeof useI18n>['t']): ProjectLandingCopy {
  return audience === 'architects' ? t.architects : t.interiors;
}

function ContactBlock({ audience }: TradePageProps) {
  const { t } = useI18n();
  const isRetailer = audience === 'retailers';
  const copy = isRetailer ? t.retailers : projectCopy(audience, t);
  return (
    <section id="trade-contact" className="scroll-mt-16 bg-[#1a1a1a] px-6 py-24 text-[#f6f3ec] sm:px-10 sm:py-32 lg:px-16" aria-labelledby="trade-contact-title">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end">
        <div>
          <p className="font-monoish text-[10px] text-[#f6f3ec]/50">{copy.contactKicker}</p>
          <h2 id="trade-contact-title" className="mt-6 max-w-3xl font-display text-6xl leading-[.84] tracking-[-.04em] sm:text-8xl">
            {copy.contactTitleBefore}<br /><em>{copy.contactTitleEm}</em>
          </h2>
          <p className="mt-8 max-w-lg text-sm leading-7 text-[#f6f3ec]/60">
            {copy.contactBody}
          </p>
        </div>
        <div className="trade-contact-card border border-white/20 p-7 text-white sm:p-9">
          <p className="font-monoish text-[9px] text-white/55">{t.retailers.contactCard}</p>
          <div className="mt-7 space-y-4 text-sm">
            <a href={studio.emailHref} className="flex items-center gap-3 transition-colors hover:text-white/65"><Mail size={15} strokeWidth={1.5} /> {studio.email}</a>
            <a href={studio.phoneHref} className="flex items-center gap-3 transition-colors hover:text-white/65"><Phone size={15} strokeWidth={1.5} /> {studio.phoneDisplay}</a>
            <p className="flex items-start gap-3 text-white/65"><MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" /> {studio.address}</p>
          </div>
          <a href={studio.emailHref} className="stone-surface marble-surface spring-hover mt-8 inline-flex items-center gap-4 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.18em]" data-testid="link-trade-email">{t.retailers.emailStudio} <ArrowRight size={15} strokeWidth={1.4} /></a>
        </div>
      </div>
    </section>
  );
}

export function RetailersPage() {
  const { locale, t } = useI18n();
  const products = t.retailers.products.map((product, index) => ({
    ...retailerProducts[index],
    name: product.name,
    note: product.note,
  }));

  return (
    <div id="top" data-audience="retailers" className="trade-page min-h-[100dvh] overflow-x-hidden bg-[#161616] text-white">
      <DocumentMeta {...documentMetaForPath('/retailers', locale)} includeSiteGraph />
      <TradeHeader />
      <main id="service-content" tabIndex={-1}>
        <section className="trade-hero relative flex min-h-[92dvh] items-end overflow-hidden bg-[#111111] px-6 pb-14 pt-36 sm:px-10 sm:pb-20 lg:px-16">
          <TradePhotograph slug="pair-stone-pedestals" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/10" />
          <div className="absolute inset-0 material-grain opacity-40" />
          <div className="relative mx-auto w-full max-w-[1440px]">
            <div className="max-w-4xl">
              <p className="reveal flex items-center gap-3 font-monoish text-[10px] text-white/60"><span className="h-px w-10 bg-white/60" /> {t.retailers.heroKicker}</p>
              <h1 className="reveal reveal-delay-1 mt-8 max-w-4xl font-display text-[clamp(4rem,11vw,10.7rem)] leading-[.8] tracking-[-.045em]">{t.retailers.heroTitleBefore}<br /><em>{t.retailers.heroTitleEm}</em></h1>
              <p className="reveal reveal-delay-2 mt-10 max-w-lg text-sm leading-7 text-white/65 sm:text-base">{t.definitions.retailer}</p>
              <a href="#trade-contact" className="stone-surface marble-surface spring-hover reveal reveal-delay-3 mt-10 inline-flex items-center gap-5 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.2em]" data-testid="link-retailer-hero-contact">{t.retailers.heroCta} <ArrowUpRight size={15} strokeWidth={1.5} /></a>
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] px-6 py-20 text-[#f6f3ec] sm:px-10 sm:py-28 lg:px-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
              <div>
                <p className="font-monoish text-[10px] text-[#f6f3ec]/50">{t.retailers.pointKicker}</p>
                <h2 className="mt-6 max-w-md font-display text-5xl leading-[.9] tracking-[-.03em] sm:text-7xl">{t.retailers.pointTitleBefore}<em>{t.retailers.pointTitleEm}</em></h2>
              </div>
              <div className="grid gap-0 divide-y divide-white/12 border-y border-white/12">
                {t.retailers.steps.map((step) => (
                  <div key={step.number} className="grid gap-4 py-7 sm:grid-cols-[60px_1fr_1.2fr] sm:items-start">
                    <span className="font-monoish text-[9px] text-[#f6f3ec]/50">{step.number}</span>
                    <h3 className="font-display text-3xl">{step.title}</h3>
                    <p className="max-w-sm text-sm leading-6 text-[#f6f3ec]/55">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#161616] px-6 py-24 sm:px-10 sm:py-32 lg:px-16" aria-labelledby="retailer-collection-title">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end">
              <div>
                <p className="font-monoish text-[10px] text-white/55">{t.retailers.editKicker}</p>
                <h2 id="retailer-collection-title" className="mt-6 font-display text-6xl leading-[.84] tracking-[-.04em] sm:text-8xl">{t.retailers.editTitleBefore}<br /><em>{t.retailers.editTitleEm}</em></h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-white/55">{t.retailers.editBody}</p>
            </div>
            <div className="mt-10"><ProductStrip products={products} /></div>
          </div>
        </section>
      </main>
      <ContactBlock audience="retailers" />
      <TradeFooter />
    </div>
  );
}

export function ArchitectsPage() {
  const { locale, t } = useI18n();
  const products = t.architects.products.map((product, index) => ({
    ...architectProducts[index],
    name: product.name,
    note: product.note,
  }));

  return (
    <div id="top" data-audience="architects" className="trade-page min-h-[100dvh] overflow-x-hidden bg-[#161616] text-white">
      <DocumentMeta {...documentMetaForPath('/architects', locale)} includeSiteGraph />
      <TradeHeader />
      <main id="service-content" tabIndex={-1}>
        <section className="trade-hero relative flex min-h-[92dvh] items-end overflow-hidden bg-[#111111] px-6 pb-14 pt-36 sm:px-10 sm:pb-20 lg:px-16">
          <TradePhotograph slug="portoro-gold-lot" image="/gallery/st-werkz/portoro-gold-inlay.jpg" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/5" />
          <div className="absolute inset-0 material-grain opacity-40" />
          <div className="relative mx-auto w-full max-w-[1440px]">
            <div className="max-w-4xl">
              <p className="reveal flex items-center gap-3 font-monoish text-[10px] text-white/60"><span className="h-px w-10 bg-white/60" /> {t.architects.heroKicker}</p>
              <h1 className="reveal reveal-delay-1 mt-8 max-w-4xl font-display text-[clamp(4rem,11vw,10.7rem)] leading-[.8] tracking-[-.045em]">{t.architects.heroTitleBefore}<br /><em>{t.architects.heroTitleEm}</em></h1>
              <p className="reveal reveal-delay-2 mt-10 max-w-lg text-sm leading-7 text-white/65 sm:text-base">{t.definitions.architect}</p>
              <a href="#trade-contact" className="stone-surface marble-surface spring-hover reveal reveal-delay-3 mt-10 inline-flex items-center gap-5 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.2em]" data-testid="link-architect-hero-contact">{t.architects.heroCta} <ArrowUpRight size={15} strokeWidth={1.5} /></a>
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] px-6 py-20 text-[#f6f3ec] sm:px-10 sm:py-28 lg:px-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
              <div>
                <p className="font-monoish text-[10px] text-[#f6f3ec]/50">{t.architects.pointKicker}</p>
                <h2 className="mt-6 max-w-md font-display text-5xl leading-[.9] tracking-[-.03em] sm:text-7xl">{t.architects.pointTitleBefore}<em>{t.architects.pointTitleEm}</em></h2>
              </div>
              <div className="grid gap-0 divide-y divide-white/12 border-y border-white/12">
                {t.architects.steps.map((step) => (
                  <div key={step.number} className="grid gap-4 py-7 sm:grid-cols-[60px_1fr_1.2fr] sm:items-start">
                    <span className="font-monoish text-[9px] text-[#f6f3ec]/50">{step.number}</span>
                    <h3 className="font-display text-3xl">{step.title}</h3>
                    <p className="max-w-sm text-sm leading-6 text-[#f6f3ec]/55">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#161616] px-6 py-24 sm:px-10 sm:py-32 lg:px-16" aria-labelledby="architect-collection-title">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end">
              <div>
                <p className="font-monoish text-[10px] text-white/55">{t.architects.editKicker}</p>
                <h2 id="architect-collection-title" className="mt-6 font-display text-6xl leading-[.84] tracking-[-.04em] sm:text-8xl">{t.architects.editTitleBefore}<br /><em>{t.architects.editTitleEm}</em></h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-white/55">{t.architects.editBody}</p>
            </div>
            <div className="mt-10"><ProductStrip products={products} /></div>
            <div className="mt-14 flex flex-col gap-5 border-t border-white/15 pt-7 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-3"><Check size={15} strokeWidth={1.5} className="text-white" /> {t.architects.samples}</p>
              <a href="#trade-contact" className="line-link self-start text-[10px] font-semibold uppercase tracking-[.18em] sm:self-auto">{t.architects.bringBrief} <ArrowRight className="ms-2 inline" size={14} /></a>
            </div>
          </div>
        </section>
      </main>
      <ContactBlock audience="architects" />
      <TradeFooter />
    </div>
  );
}

export function InteriorsPage() {
  const { locale, t } = useI18n();
  const copy = t.interiors;
  const products = copy.products.map((product, index) => ({
    ...interiorProducts[index],
    name: product.name,
    note: product.note,
  }));

  return (
    <div id="top" data-audience="interiors" className="trade-page min-h-[100dvh] overflow-x-hidden bg-[#161616] text-white">
      <DocumentMeta {...documentMetaForPath('/interiors', locale)} includeSiteGraph />
      <TradeHeader />
      <main id="service-content" tabIndex={-1}>
        <section className="trade-hero relative flex min-h-[92dvh] items-end overflow-hidden bg-[#111111] px-6 pb-14 pt-36 sm:px-10 sm:pb-20 lg:px-16">
          <TradePhotograph slug="linear-travertine-coffee" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/5" />
          <div className="absolute inset-0 material-grain opacity-40" />
          <div className="relative mx-auto w-full max-w-[1440px]">
            <div className="max-w-4xl">
              <p className="reveal flex items-center gap-3 font-monoish text-[10px] text-white/60"><span className="h-px w-10 bg-white/60" /> {copy.heroKicker}</p>
              <h1 className="reveal reveal-delay-1 mt-8 max-w-4xl font-display text-[clamp(4rem,11vw,10.7rem)] leading-[.8] tracking-[-.045em]">{copy.heroTitleBefore}<br /><em>{copy.heroTitleEm}</em></h1>
              <p className="reveal reveal-delay-2 mt-10 max-w-lg text-sm leading-7 text-white/65 sm:text-base">{t.definitions.interiorDesigner}</p>
              <a href="#trade-contact" className="stone-surface marble-surface spring-hover reveal reveal-delay-3 mt-10 inline-flex items-center gap-5 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.2em]" data-testid="link-interiors-hero-contact">{copy.heroCta} <ArrowUpRight size={15} strokeWidth={1.5} /></a>
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] px-6 py-20 text-[#f6f3ec] sm:px-10 sm:py-28 lg:px-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
              <div>
                <p className="font-monoish text-[10px] text-[#f6f3ec]/50">{copy.pointKicker}</p>
                <h2 className="mt-6 max-w-md font-display text-5xl leading-[.9] tracking-[-.03em] sm:text-7xl">{copy.pointTitleBefore}<em>{copy.pointTitleEm}</em></h2>
              </div>
              <div className="grid gap-0 divide-y divide-white/12 border-y border-white/12">
                {copy.steps.map((step) => (
                  <div key={step.number} className="grid gap-4 py-7 sm:grid-cols-[60px_1fr_1.2fr] sm:items-start">
                    <span className="font-monoish text-[9px] text-[#f6f3ec]/50">{step.number}</span>
                    <h3 className="font-display text-3xl">{step.title}</h3>
                    <p className="max-w-sm text-sm leading-6 text-[#f6f3ec]/55">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#161616] px-6 py-24 sm:px-10 sm:py-32 lg:px-16" aria-labelledby="interiors-collection-title">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end">
              <div>
                <p className="font-monoish text-[10px] text-white/55">{copy.editKicker}</p>
                <h2 id="interiors-collection-title" className="mt-6 font-display text-6xl leading-[.84] tracking-[-.04em] sm:text-8xl">{copy.editTitleBefore}<br /><em>{copy.editTitleEm}</em></h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-white/55">{copy.editBody}</p>
            </div>
            <div className="mt-10"><ProductStrip products={products} /></div>
            <div className="mt-14 flex flex-col gap-5 border-t border-white/15 pt-7 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-3"><Check size={15} strokeWidth={1.5} className="text-white" /> {copy.samples}</p>
              <a href="#trade-contact" className="line-link self-start text-[10px] font-semibold uppercase tracking-[.18em] sm:self-auto">{copy.bringBrief} <ArrowRight className="ms-2 inline" size={14} /></a>
            </div>
          </div>
        </section>
      </main>
      <ContactBlock audience="interiors" />
      <TradeFooter />
    </div>
  );
}
