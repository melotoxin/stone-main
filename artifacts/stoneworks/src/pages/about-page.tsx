import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { OfficesList } from '@/components/layout/OfficesList';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { MarbleButton } from '@/components/ui/MarbleButton';
import { getPiece, pieceHref } from '@/data/gallery';
import { editorialMedia } from '@/data/editorial-media';
import { localizedPiece, useI18n } from '@/i18n';
import { SHOW_PRICING, quoteHref, getB2BCopy } from '@/data/b2b';
import '@/styles/studio-pages.css';

const PATHS = [
  { key: 'retail' as const, href: '/retail' },
  { key: 'architects' as const, href: '/architects' },
  { key: 'interiors' as const, href: '/interiors' },
  { key: 'wholesale' as const, href: '/export' },
];

export function AboutPage() {
  const { t, locale } = useI18n();
  const copy = t.about;
  const b2bCopy = getB2BCopy(locale);
  const object = localizedPiece(getPiece('handicrafts', 'tall-noir-vase')!, locale);
  const material = localizedPiece(getPiece('slabs', 'nero-calcite-lot')!, locale);

  return (
    <SiteChrome>
      <main id="about" className="studio-page studio-about">
        <section className="studio-shell studio-about__intro">
          <div>
            <p className="studio-kicker">{copy.kicker}</p>
            <h1>{copy.titleBefore}<em>{copy.titleEm}</em></h1>
            <p className="studio-lead speakable">{copy.lead}</p>
            <Link href="/atelier" className="studio-text-link" data-testid="link-about-atelier-intro">
              {copy.atelierCta}<ArrowRight size={17} strokeWidth={1.4} aria-hidden="true" />
            </Link>
          </div>
          <figure className="studio-about__object">
            <Link href={pieceHref(object)} className="studio-photo">
              <img src={editorialMedia.studio.aboutObject} alt={t.seo.pieceAlt(object.title, object.material)} width={736} height={1104} decoding="async" />
            </Link>
            <figcaption><span>{object.code}</span><Link href={pieceHref(object)}>{object.title}<ArrowUpRight size={15} aria-hidden="true" /></Link></figcaption>
          </figure>
        </section>

        <section className="studio-shell studio-about__material" aria-labelledby="about-studio-title">
          <figure>
            <Link href={pieceHref(material)} className="studio-photo">
              <img src={editorialMedia.studio.aboutMaterial} alt={t.seo.pieceAlt(material.title, material.material)} width={736} height={981} loading="lazy" decoding="async" />
            </Link>
            <figcaption><span>{material.code}</span><Link href={pieceHref(material)}>{material.title}<ArrowUpRight size={15} aria-hidden="true" /></Link></figcaption>
          </figure>
          <div>
            <p className="studio-kicker">{copy.studioKicker}</p>
            <h2 id="about-studio-title">{copy.studioTitleBefore}<em>{copy.studioTitleEm}</em></h2>
            <p className="studio-body speakable">{copy.studioBody}</p>
          </div>
        </section>

        <section className="studio-shell studio-about__paths" aria-labelledby="about-paths-title">
          <div className="studio-section-heading">
            <p className="studio-kicker">{copy.pathsKicker}</p>
            <h2 id="about-paths-title">{copy.pathsTitleBefore}<em>{copy.pathsTitleEm}</em></h2>
          </div>
          <div className="studio-about__path-grid">
            {PATHS.map((path, index) => {
              const item = copy[path.key];
              return (
                <Link key={path.key} href={path.href} className="studio-about__path" data-testid={`link-about-${path.key}`}>
                  <span className="studio-index">{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{item.name}</h3><p>{item.text}</p><span className="studio-about__path-cta">{item.cta}</span></div>
                  <ArrowUpRight size={22} strokeWidth={1.3} aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="studio-shell studio-about__offices" aria-labelledby="about-offices-title">
          <p className="studio-kicker">{copy.officesKicker}</p>
          <h2 id="about-offices-title">{copy.officesTitleBefore}<em>{copy.officesTitleEm}</em></h2>
          <p className="studio-body">{copy.officesBody}</p>
          <OfficesList variant="page" />
        </section>

        <section className="studio-paper" aria-labelledby="about-visit-title">
          <div className="studio-shell studio-contact">
            <div><p className="studio-kicker">{copy.visitKicker}</p><h2 id="about-visit-title">{copy.visitTitleBefore}<em>{copy.visitTitleEm}</em></h2><p className="studio-body">{copy.visitBody}</p></div>
            <div className="studio-contact__actions">
              <MarbleButton href={quoteHref()} variant="dark" data-testid="link-about-enquire">{b2bCopy.inquireForQuote}</MarbleButton>
              <Link href="/atelier" className="studio-text-link" data-testid="link-about-atelier">{copy.atelierCta}<ArrowRight size={17} aria-hidden="true" /></Link>
              {SHOW_PRICING && <Link href="/estimate" className="studio-text-link" data-testid="link-about-estimate">{copy.estimateCta}<ArrowRight size={17} aria-hidden="true" /></Link>}
            </div>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
