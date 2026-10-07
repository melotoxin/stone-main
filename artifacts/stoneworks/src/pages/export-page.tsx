import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link } from 'wouter';
import { LanguageSwitcher, LocaleHint, localizedPiece, useI18n } from '@/i18n';
import { ServiceHeader } from '@/components/layout/ServiceHeader';
import { StoneworksMark } from '@/components/brand/StoneworksMark';
import { PoweredByCredit } from '@/components/layout/PoweredByCredit';
import { DocumentMeta } from '@/components/seo/DocumentMeta';
import { exportLots, exportMailto, EXPORT_OG_IMAGE } from '@/data/export';
import { pieces, studio } from '@/data/gallery';
import { documentMetaForPath } from '@/lib/page-meta';
import '@/styles/service-refinements.css';

export function ExportPage() {
  const { locale, t } = useI18n();
  const x = t.exportDesk;
  const [submitted, setSubmitted] = useState(false);
  const [mailHref, setMailHref] = useState(studio.emailHref);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const href = exportMailto({
      name: String(data.get('name') ?? ''),
      company: String(data.get('company') ?? ''),
      email: String(data.get('email') ?? ''),
      port: String(data.get('port') ?? ''),
      stone: String(data.get('stone') ?? ''),
      message: String(data.get('message') ?? ''),
    });
    setMailHref(href);
    setSubmitted(true);
  };

  const meta = documentMetaForPath('/export', locale);

  return (
    <div id="top" className="export-page min-h-[100dvh] overflow-x-hidden bg-[#161616] text-white">
      <DocumentMeta
        {...meta}
        image={EXPORT_OG_IMAGE}
        imageAlt={x.heroAlt}
        keywords={x.keywords}
        includeSiteGraph
      />
      <ServiceHeader kind="export" contactHref="#export-contact" contactLabel={x.requestLot} mobileContactLabel={x.enquire} navLabel={x.navAria} />

      <main id="service-content" tabIndex={-1}>
        <section className="trade-hero relative flex min-h-[92dvh] items-end overflow-hidden bg-[#111111] px-6 pb-14 pt-36 sm:px-10 sm:pb-20 lg:px-16">
          <figure className="trade-hero__photograph"><a href="#slab-book"><img src={EXPORT_OG_IMAGE} alt={x.heroAlt} fetchPriority="high" decoding="async" /><figcaption><span>STW</span><span>{x.bookKicker}</span><ArrowUpRight size={17} aria-hidden="true" /></figcaption></a></figure>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/15" />
          <div className="absolute inset-0 material-grain opacity-40" />
          <div className="relative mx-auto w-full max-w-[1440px]">
            <div className="max-w-4xl">
              <p className="reveal flex items-center gap-3 font-monoish text-[10px] text-white/60">
                <span className="h-px w-10 bg-white/60" /> {x.heroKicker}
              </p>
              <h1 className="reveal reveal-delay-1 mt-8 max-w-4xl font-display text-[clamp(3.4rem,10vw,9.5rem)] leading-[.8] tracking-[-.045em]">
                {x.heroTitleBefore}<br /><em>{x.heroTitleEm}</em>
              </h1>
              <p className="speakable reveal reveal-delay-2 mt-10 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
                {t.definitions.export}
              </p>
              <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-6">
                <a
                  href="#export-contact"
                  className="stone-surface marble-surface spring-hover inline-flex items-center gap-5 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.2em]"
                  data-testid="link-export-hero-contact"
                >
                  {x.heroCta} <ArrowUpRight size={15} strokeWidth={1.5} />
                </a>
                <a href="#slab-book" className="line-link text-[10px] font-semibold uppercase tracking-[.18em]" data-testid="link-export-hero-book">
                  {x.heroBook}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] px-6 py-20 text-[#f6f3ec] sm:px-10 sm:py-28 lg:px-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
              <div>
                <p className="font-monoish text-[10px] text-[#f6f3ec]/50">{x.separateKicker}</p>
                <h2 className="mt-6 max-w-md font-display text-5xl leading-[.9] tracking-[-.03em] sm:text-7xl">
                  {x.separateTitleBefore}<em>{x.separateTitleEm}</em>
                </h2>
              </div>
              <div className="grid gap-0 divide-y divide-white/12 border-y border-white/12">
                {x.principles.map((item) => (
                  <div key={item.number} className="grid gap-4 py-7 sm:grid-cols-[60px_1fr_1.2fr] sm:items-start">
                    <span className="font-monoish text-[9px] text-[#f6f3ec]/50">{item.number}</span>
                    <h3 className="font-display text-3xl">{item.title}</h3>
                    <p className="max-w-sm text-sm leading-6 text-[#f6f3ec]/55">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="slab-book" className="scroll-mt-24 bg-[#161616] px-6 py-24 sm:px-10 sm:py-32 lg:px-16" aria-labelledby="slab-book-title">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-10 md:flex-row md:items-end">
              <div>
                <p className="font-monoish text-[10px] text-white/55">{x.bookKicker}</p>
                <h2 id="slab-book-title" className="mt-6 font-display text-6xl leading-[.84] tracking-[-.04em] sm:text-8xl">
                  {x.bookTitleBefore}<br /><em>{x.bookTitleEm}</em>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-white/55">{x.legend}</p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              {exportLots.map((lot, index) => {
                const source = pieces.find((piece) => piece.slug === lot.slug);
                const local = source ? localizedPiece(source, locale) : lot;
                return (
                  <article key={lot.slug} className="group" data-testid={`card-export-lot-${lot.slug}`}>
                    <Link href={lot.href} className="block">
                      <div className="stone-card aspect-[4/5] overflow-hidden bg-[#333333] sm:aspect-[16/11]">
                        <img
                          src={lot.image}
                          loading="lazy"
                          decoding="async"
                          alt={x.lotAlt(local.title, local.material)}
                          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                      <p className="mt-5 font-monoish text-[9px] text-white/45">
                        {String(index + 1).padStart(2, '0')} / {x.lotFamilyFigured} · {x.lotStatusEvidence}
                      </p>
                      <h3 className="mt-3 font-display text-4xl leading-none">{local.title}</h3>
                      <p className="mt-3 text-[10px] uppercase tracking-[.14em] text-white/45">{local.material}</p>
                      <p className="mt-4 max-w-md text-sm leading-6 text-white/60">{'note' in local ? local.note : lot.note}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white/70">
                        {x.openGallery} <ArrowUpRight size={13} strokeWidth={1.5} />
                      </span>
                    </Link>
                  </article>
                );
              })}
            </div>

            <div className="mt-20 grid gap-0 divide-y divide-white/15 border-y border-white/15 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
              {x.lotFamilies.map((family) => (
                <div key={family.name} className="py-8 lg:px-10 lg:py-12 first:lg:pl-0 last:lg:pr-0">
                  <h3 className="font-display text-3xl">{family.name}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">{family.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[10px] uppercase tracking-[.16em] text-white/40">
              {x.namedStonesLine}{' '}
              <Link href="/stones" className="line-link text-white/55" data-testid="link-export-named-stones">
                /stones
              </Link>
              {' · '}
              {x.citationLine}{' '}
              <a href="/citation/export.md" className="line-link text-white/55" data-testid="link-export-citation">
                /citation/export.md
              </a>
            </p>
          </div>
        </section>

        <section className="bg-[#1a1a1a] px-6 py-24 text-[#f6f3ec] sm:px-10 sm:py-32 lg:px-16" aria-labelledby="howto-export-title">
          <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="font-monoish text-[10px] text-[#f6f3ec]/50">{x.howKicker}</p>
              <h2 id="howto-export-title" className="mt-7 max-w-sm font-display text-5xl leading-[.93] sm:text-7xl">
                {x.howTitleBefore}<em>{x.howTitleEm}</em>
              </h2>
            </div>
            <ol className="divide-y divide-white/12 border-y border-white/12">
              {x.howTo.map((step) => (
                <li key={step.number} className="grid gap-4 py-7 sm:grid-cols-[70px_1fr] sm:items-start" data-testid={`howto-export-${step.number}`}>
                  <span className="font-monoish text-[9px] text-[#f6f3ec]/50">{step.number}</span>
                  <div>
                    <h3 className="font-display text-3xl leading-[1.05]">{step.name}</h3>
                    <p className="speakable mt-4 max-w-xl text-sm leading-7 text-[#f6f3ec]/55">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-[#111111] px-6 py-24 sm:px-10 sm:py-32 lg:px-16" aria-labelledby="terms-title">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-monoish text-[10px] text-white/55">{x.termsKicker}</p>
            <h2 id="terms-title" className="mt-6 max-w-2xl font-display text-5xl leading-[.9] tracking-[-.03em] sm:text-7xl">
              {x.termsTitleBefore}<em>{x.termsTitleEm}</em>
            </h2>
            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              {x.terms.map((term) => (
                <div key={term.title} className="border-t border-white/15 pt-6">
                  <h3 className="font-display text-3xl">{term.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-6 text-white/55">{term.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] px-6 py-24 text-[#f6f3ec] sm:px-10 sm:py-32 lg:px-16" aria-labelledby="qc-title">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-monoish text-[10px] text-[#f6f3ec]/50">{x.qcKicker}</p>
            <h2 id="qc-title" className="mt-6 max-w-xl font-display text-5xl leading-[.9] sm:text-7xl">
              {x.qcTitleBefore}<em>{x.qcTitleEm}</em>
            </h2>
            <dl className="mt-14 divide-y divide-white/12 border-y border-white/12">
              {x.qc.map((item, index) => (
                <div key={item.title} className="grid gap-4 py-8 lg:grid-cols-[70px_.9fr_1.1fr] lg:gap-10">
                  <span className="font-monoish text-[9px] text-[#f6f3ec]/50">{String(index + 1).padStart(2, '0')}</span>
                  <dt className="font-display text-2xl leading-tight sm:text-3xl">{item.title}</dt>
                  <dd className="max-w-xl text-sm leading-7 text-[#f6f3ec]/55">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="export-faq" className="scroll-mt-24 bg-[#161616] px-6 py-24 sm:px-10 sm:py-32 lg:px-16" aria-labelledby="export-faq-title">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-monoish text-[10px] text-white/55">{x.faqKicker}</p>
            <h2 id="export-faq-title" className="mt-7 max-w-xl font-display text-5xl leading-[.93] sm:text-7xl">
              {x.faqTitleBefore}<em>{x.faqTitleEm}</em>
            </h2>
            <div className="export-faq-list">
              {x.faqs.map(item => <details key={item.id} data-testid={`faq-export-${item.id}`}><summary>{item.question}</summary><p className="speakable">{item.answer}</p></details>)}
            </div>
          </div>
        </section>

        <section id="export-contact" className="scroll-mt-16 bg-[#1a1a1a] px-6 py-24 text-[#f6f3ec] sm:px-10 sm:py-32 lg:px-16" aria-labelledby="export-contact-title">
          <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <p className="font-monoish text-[10px] text-[#f6f3ec]/50">{x.contactKicker}</p>
              <h2 id="export-contact-title" className="mt-6 max-w-xl font-display text-6xl leading-[.84] tracking-[-.04em] sm:text-8xl">
                {x.contactTitleBefore}<br /><em>{x.contactTitleEm}</em>
              </h2>
              <p className="mt-8 max-w-lg text-sm leading-7 text-[#f6f3ec]/60">{x.contactBody}</p>
              <div className="mt-12 space-y-4 border-t border-white/12 pt-6 text-sm">
                <a href={studio.emailHref} className="flex items-center gap-3 transition-colors hover:text-[#f6f3ec]/60" data-testid="link-export-email">
                  <Mail size={15} strokeWidth={1.5} /> {studio.email}
                </a>
                <a href={studio.phoneHref} className="flex items-center gap-3 transition-colors hover:text-[#f6f3ec]/60" data-testid="link-export-phone">
                  <Phone size={15} strokeWidth={1.5} /> {studio.phoneDisplay}
                </a>
                <p className="flex max-w-xs items-start gap-3 text-[#f6f3ec]/55">
                  <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" /> {studio.address}
                </p>
              </div>
            </div>

            <div className="lg:pt-6">
              {submitted ? (
                <div className="border border-white/12 bg-white/5 p-8 sm:p-12" data-testid="status-export-success">
                  <Check size={22} strokeWidth={1.5} />
                  <h3 className="mt-8 font-display text-4xl">{x.successTitle}</h3>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-[#f6f3ec]/60">{x.successBody}</p>
                  <a
                    href={mailHref}
                    className="mt-8 inline-flex items-center gap-3 border-b border-[#f6f3ec] pb-2 text-[10px] font-semibold uppercase tracking-[.18em]"
                    data-testid="link-export-success-mailto"
                  >
                    {x.openEmail} <ArrowUpRight size={14} strokeWidth={1.5} />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7" data-testid="form-export">
                  <label className="block">
                    <span className="font-monoish text-[9px] text-[#f6f3ec]/45">{x.fieldName}</span>
                    <input
                      required
                      name="name"
                      type="text"
                      autoComplete="name"
                      className="mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#f6f3ec]/35 focus:border-[#f6f3ec]"
                      data-testid="input-export-name"
                    />
                  </label>
                  <label className="block">
                    <span className="font-monoish text-[9px] text-[#f6f3ec]/45">{x.fieldCompany}</span>
                    <input
                      required
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className="mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base outline-none focus:border-[#f6f3ec]"
                      data-testid="input-export-company"
                    />
                  </label>
                  <label className="block">
                    <span className="font-monoish text-[9px] text-[#f6f3ec]/45">{x.fieldEmail}</span>
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base outline-none focus:border-[#f6f3ec]"
                      data-testid="input-export-email"
                    />
                  </label>
                  <label className="block">
                    <span className="font-monoish text-[9px] text-[#f6f3ec]/45">{x.fieldPort}</span>
                    <input
                      required
                      name="port"
                      type="text"
                      placeholder={x.portPlaceholder}
                      className="mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#f6f3ec]/35 focus:border-[#f6f3ec]"
                      data-testid="input-export-port"
                    />
                  </label>
                  <label className="block">
                    <span className="font-monoish text-[9px] text-[#f6f3ec]/45">{x.fieldStone}</span>
                    <select
                      required
                      name="stone"
                      defaultValue=""
                      className="mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base outline-none focus:border-[#f6f3ec]"
                      data-testid="input-export-stone"
                    >
                      <option value="" disabled>
                        {x.chooseStone}
                      </option>
                      <option value="Figured marble">{x.stoneFigured}</option>
                      <option value="Onyx">{x.stoneOnyx}</option>
                      <option value="Travertine">{x.stoneTravertine}</option>
                      <option value="Mixed lot">{x.stoneMixed}</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="font-monoish text-[9px] text-[#f6f3ec]/45">{x.fieldNeed}</span>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder={x.needPlaceholder}
                      className="mt-3 w-full resize-none border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#f6f3ec]/35 focus:border-[#f6f3ec]"
                      data-testid="input-export-message"
                    />
                  </label>
                  <button
                    type="submit"
                    className="stone-surface marble-surface spring-hover group mt-3 flex items-center gap-5 px-6 py-4 text-[10px] font-semibold uppercase tracking-[.2em]"
                    data-testid="button-submit-export"
                  >
                    {x.send} <ArrowRight size={15} strokeWidth={1.4} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/15 bg-[#111111] px-6 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] text-white sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 text-[10px] uppercase tracking-[.16em] text-white/45 sm:flex-row sm:items-center">
          <Link href="/" className="self-start normal-case tracking-normal" data-testid="link-export-footer-brand">
            <StoneworksMark variant="onDark" markSize={36} />
          </Link>
          <p>{x.footerTag}</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/stones" className="line-link">{x.namedStones}</Link>
            <Link href="/collection" className="line-link">{x.collection}</Link>
            <Link href="/architects" className="line-link">{x.architects}</Link>
            <a href="#top" className="line-link">{x.backToTop}</a>
          </div>
        </div>
        <div className="mx-auto mt-6 flex max-w-[1440px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <LanguageSwitcher variant="footer" />
          <PoweredByCredit />
        </div>
      </footer>
      <LocaleHint />
    </div>
  );
}
