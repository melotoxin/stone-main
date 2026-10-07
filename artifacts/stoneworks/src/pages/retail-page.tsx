import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, Search } from 'lucide-react';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { pieceHref, retailWorks, rooms, type RoomSlug } from '@/data/gallery';
import { quoteHref } from '@/data/b2b';
import { localizedPiece, localizedRoom, useI18n } from '@/i18n';
import '@/styles/retail-refinements.css';

const retailInventory = retailWorks();
const retailRooms = rooms.filter(room => retailInventory.some(piece => piece.room === room.slug));
type RetailFilter = 'all' | RoomSlug;

export function RetailStorePage() {
  const { locale, t } = useI18n();
  const copy = t.retailStore;
  const [filter, setFilter] = useState<RetailFilter>('all');
  const [query, setQuery] = useState('');
  const searchResults = useMemo(() => {
    const term = query.trim().toLocaleLowerCase(locale);
    return retailInventory.filter(piece => {
      if (!term) return true;
      const local = localizedPiece(piece, locale);
      return `${local.title} ${local.material} ${local.form} ${piece.title} ${piece.material} ${piece.code}`.toLocaleLowerCase(locale).includes(term);
    });
  }, [locale, query]);
  const visibleWorks = searchResults.filter(piece => filter === 'all' || piece.room === filter);
  const selectedLabel = filter === 'all' ? copy.filterAll : localizedRoom(retailRooms.find(room => room.slug === filter)!, locale).title;

  return (
    <SiteChrome>
      <main id="top" className="retail-page">
        <section className="retail-intro" aria-labelledby="retail-title">
          <div>
            <p className="retail-eyebrow">{copy.kicker}</p>
            <h1 id="retail-title">{copy.titleBefore}<em>{copy.titleEm}</em></h1>
          </div>
          <div className="retail-intro__summary">
            <p>{copy.body}</p>
            <div className="retail-intro__actions">
              <Link href="/collection" className="retail-text-link" data-testid="link-retail-collection">{copy.enterCollection}<ArrowUpRight size={18} aria-hidden="true" /></Link>
              <Link href="/enquire" className="retail-text-link" data-testid="link-retail-viewing">{copy.requestViewing}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
            <span className="retail-intro__count">{copy.countLine(retailInventory.length)}</span>
          </div>
        </section>

        <section className="retail-inventory" aria-labelledby="retail-inventory-title">
          <div className="retail-inventory__heading">
            <div><p className="retail-eyebrow">{copy.storeKicker}</p><h2 id="retail-inventory-title">{copy.storeTitleBefore}<em>{copy.storeTitleEm}</em></h2></div>
            <div className="retail-search"><Search size={19} aria-hidden="true" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} aria-label={t.luxuryHome.search} placeholder={t.luxuryHome.searchHint} aria-controls="retail-object-list" data-testid="input-retail-search" /></div>
          </div>
          <div className="retail-filters" role="group" aria-label={copy.filterAria}>
            <button type="button" onClick={() => setFilter('all')} aria-pressed={filter === 'all'} aria-controls="retail-object-list" aria-label={`${copy.filterAll}: ${copy.countLine(searchResults.length)}`} data-testid="button-retail-filter-all">{copy.filterAll}<span aria-hidden="true">{searchResults.length}</span></button>
            {retailRooms.map(room => {
              const label = localizedRoom(room, locale).title;
              const count = searchResults.filter(piece => piece.room === room.slug).length;
              return <button type="button" key={room.slug} onClick={() => setFilter(room.slug)} aria-pressed={filter === room.slug} aria-controls="retail-object-list" aria-label={`${label}: ${copy.countLine(count)}`} data-testid={`button-retail-filter-${room.slug}`}>{label}<span aria-hidden="true">{count}</span></button>;
            })}
          </div>
          <p className="retail-inventory__status" role="status" aria-live="polite" aria-atomic="true"><span>{selectedLabel}</span><span>{copy.countLine(visibleWorks.length)}</span></p>
          <div id="retail-object-list" className="retail-object-list">
            {visibleWorks.map(piece => {
              const local = localizedPiece(piece, locale);
              return <article key={piece.slug} className="retail-object" data-testid={`card-retail-${piece.slug}`}>
                <Link href={pieceHref(piece)} className="retail-object__detail" data-testid={`link-retail-product-${piece.slug}`}>
                  <div className="retail-object__photograph"><img src={piece.images[0]} alt={t.seo.pieceAlt(local.title, local.material)} width={600} height={600} loading="lazy" decoding="async" /><span className="retail-object__open" aria-hidden="true"><ArrowUpRight size={22} /></span></div>
                  <div className="retail-object__copy"><span className="retail-object__code">{piece.code}</span><h3>{local.title}</h3><p>{local.material}</p>{piece.dimensions && <span className="retail-object__dimensions">{piece.dimensions}</span>}</div>
                </Link>
                <Link href={quoteHref({ code: piece.code, name: local.title })} className="retail-object__enquire" data-testid={`link-retail-viewing-${piece.slug}`}>{copy.pieceEnquire}<ArrowUpRight size={13} aria-hidden="true" /></Link>
              </article>;
            })}
          </div>
          {!visibleWorks.length && <div className="retail-empty"><p>{t.luxuryHome.noResults}</p><button type="button" onClick={() => { setFilter('all'); setQuery(''); }} className="retail-text-link" data-testid="button-retail-reset">{copy.filterAll}<ArrowUpRight size={17} aria-hidden="true" /></button></div>}
        </section>

        <section className="retail-process" aria-labelledby="retail-process-title">
          <div><p className="retail-eyebrow">{copy.pathKicker}</p><h2 id="retail-process-title">{copy.pathTitleBefore}<em>{copy.pathTitleEm}</em></h2></div>
          <ol>{copy.steps.map((step,index) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{locale === 'en' && index === 0 ? 'Browse the collection and use the material filters to find your piece.' : step.body}</p></li>)}</ol>
        </section>
      </main>
    </SiteChrome>
  );
}
