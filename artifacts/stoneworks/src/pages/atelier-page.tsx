import { Link } from 'wouter';
import { ArrowRight, ArrowUpRight, ChevronDown, Phone } from 'lucide-react';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { FaqSection } from '@/components/seo/FaqSection';
import { MarbleButton } from '@/components/ui/MarbleButton';
import { getPiece, pieceHref, studio } from '@/data/gallery';
import { editorialMedia, originalCatalogImage } from '@/data/editorial-media';
import { formatStonePkr, pakistanStoneHighlights, pakistanStones, stonePatternSrc } from '@/data/pakistan-stones';
import { localizedPiece, useI18n } from '@/i18n';
import { SHOW_PRICING, quoteHref, getB2BCopy } from '@/data/b2b';
import '@/styles/studio-pages.css';

export function AtelierPage() {
  const { t, locale } = useI18n();
  const b2bCopy = getB2BCopy(locale);
  const mantel = localizedPiece(getPiece('marble', 'portoro-workshop-mantel')!, locale);

  return (
    <SiteChrome>
      <main id="studio" className="studio-page studio-atelier">
        <section className="studio-shell studio-atelier__intro">
          <div>
            <p className="studio-kicker">{t.atelier.kicker}</p>
            <h1>{t.atelier.titleBefore}<em>{t.atelier.titleEm}</em></h1>
            <p className="studio-lead speakable">{t.definitions.studio}</p>
            <a href="#atelier-process" className="studio-text-link">{t.atelier.howKicker}<ArrowRight size={17} aria-hidden="true" /></a>
          </div>
          <figure className="studio-atelier__workshop">
            <Link href={pieceHref(mantel)} className="studio-photo">
              <img src={editorialMedia.studio.atelier} alt={t.seo.pieceAlt(mantel.title, mantel.form)} width={531} height={709} decoding="async" />
            </Link>
            <figcaption><span>{mantel.code}</span><Link href={pieceHref(mantel)}>{mantel.title}<ArrowUpRight size={15} aria-hidden="true" /></Link></figcaption>
          </figure>
        </section>

        <section className="studio-paper" aria-labelledby="origin-title">
          <div className="studio-shell studio-atelier__origin">
            <div><p className="studio-kicker">{t.atelier.originKicker}</p><h2 id="origin-title">{t.atelier.originTitleBefore}<em>{t.atelier.originTitleEm}</em></h2></div>
            <p className="studio-body speakable">{t.definitions.origin}</p>
          </div>
        </section>

        <section id="atelier-process" className="studio-shell studio-atelier__process" aria-labelledby="atelier-process-title">
          <div className="studio-section-heading">
            <p className="studio-kicker">{t.atelier.howKicker}</p>
            <h2 id="atelier-process-title">{t.atelier.howTitleBefore}<em>{t.atelier.howTitleEm}</em></h2>
          </div>
          <div className="studio-atelier__steps">
            {t.atelier.process.map((step, index) => (
              <details key={step.name} open={index === 0} data-testid={`text-process-${String(index + 1).padStart(2, '0')}`}>
                <summary><span className="studio-index">{String(index + 1).padStart(2, '0')}</span><h3>{step.name}</h3><ChevronDown size={18} strokeWidth={1.3} aria-hidden="true" /></summary>
                <p>{step.text}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="studio-shell studio-atelier__materials" aria-labelledby="materials-title">
          <p className="studio-kicker">{t.atelier.materialsKicker}</p>
          <h2 id="materials-title">{t.atelier.materialsTitleBefore}<em>{t.atelier.materialsTitleEm}</em></h2>
          <dl className="studio-atelier__families">
            {(['travertine', 'onyx', 'marble'] as const).map((id, index) => <div key={id}><span className="studio-index">{String(index + 1).padStart(2, '0')}</span><dt>{t.materials[id].label}</dt><dd className="speakable">{t.materials[id].cite}</dd></div>)}
          </dl>
          <div className="studio-atelier__stone-heading"><p className="studio-kicker">{t.atelier.namedStonesKicker} / {pakistanStones.length}</p><p className="studio-body">{t.atelier.namedStonesBody}</p></div>
          <div className="studio-atelier__stones">
            {pakistanStoneHighlights.map((stone) => (
              <Link key={stone.id} href={`/stones#${stone.id}`} className="studio-atelier__stone">
                <div className="studio-photo"><img src={originalCatalogImage(stonePatternSrc(stone))} alt={t.stonesIndex.imageAlt(stone.name, stone.colour)} width={640} height={480} loading="lazy" decoding="async" /></div>
                <div><span>{stone.name}</span><ArrowUpRight size={16} aria-hidden="true" /></div>
                {SHOW_PRICING && <p>{formatStonePkr(stone)} / sq ft</p>}
              </Link>
            ))}
          </div>
          <Link href="/stones" className="studio-text-link" data-testid="link-atelier-stones">{t.atelier.namedStonesCta}<ArrowRight size={17} aria-hidden="true" /></Link>
        </section>

        <FaqSection />

        <section className="studio-shell studio-contact studio-atelier__contact" aria-labelledby="card-title">
          <div><p className="studio-kicker">{t.atelier.personKicker}</p><h2 id="card-title">{t.atelier.personTitleBefore} <em>{t.atelier.personTitleEm}</em></h2><p className="studio-body">{t.atelier.personBody(studio.name)}</p></div>
          <div className="studio-contact__actions">
            <a href={studio.phoneHref} className="studio-atelier__phone" data-testid="link-card-phone"><Phone size={17} strokeWidth={1.5} aria-hidden="true" />{studio.phoneDisplay}</a>
            <MarbleButton href={quoteHref()} variant="light" data-testid="link-studio-enquire">{b2bCopy.inquireForQuote}</MarbleButton>
            {SHOW_PRICING && <Link href="/estimate" className="studio-text-link" data-testid="link-studio-estimate">{t.atelier.studioEstimate}<ArrowRight size={17} aria-hidden="true" /></Link>}
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
