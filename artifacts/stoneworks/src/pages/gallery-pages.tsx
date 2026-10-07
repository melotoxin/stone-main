import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { GalleryBreadcrumb } from '@/components/seo/GalleryBreadcrumb';
import { WorkTombstone } from '@/components/seo/WorkTombstone';
import { estimateHrefForPiece } from '@/data/estimate';
import {
  getPiece,
  getRoom,
  pieceHref,
  piecesInRoom,
  relatedPieces,
  roomHref,
  rooms,
  type Piece,
  type RoomSlug,
} from '@/data/gallery';
import { getWorkRecord, KNOWLEDGE_REVIEWED, principal } from '@/data/knowledge';
import { localizedPiece, localizedRoom, useI18n } from '@/i18n';
import { SHOW_PRICING, getB2BCopy, quoteHref } from '@/data/b2b';
import { originalCatalogImage } from '@/data/editorial-media';
import '@/styles/collections.css';

type RouteParams = { room?: string; piece?: string };

const materialPhotographs: Record<RoomSlug, { image: string; alt: string; caption: string }> = {
  marble: { image: '/gallery/stone-faces/black-n-gold.jpg', alt: 'Black and Gold marble sample with dark stone and warm gold veins', caption: 'Black & Gold / Marble face' },
  onyx: { image: '/gallery/stone-faces/light-green-onyx.jpg', alt: 'Light green onyx sample with soft bands of green and cream', caption: 'Light Green Onyx / Stone face' },
  limestone: { image: '/gallery/living-monolith-coffee.jpg', alt: 'Honed travertine coffee table with a thick slab and two stone plinth legs', caption: 'Travertine / Formed in stone' },
  tiles: { image: '/gallery/stone-faces/flower.jpg', alt: 'Flower Marble sample showing red, pink and grey floral mineral patterns', caption: 'Flower Marble / Stone face' },
  slabs: { image: '/gallery/surfaces-nero-slab-a.jpg', alt: 'Original photograph of black marble slabs with white veins standing in the stone yard', caption: 'Nero slabs / At the yard' },
  handicrafts: { image: '/gallery/st-werkz/portoro-baluster-vase.jpg', alt: 'Carved Portoro marble baluster vase with a ringed neck and pedestal foot', caption: 'Portoro / The carved object' },
};

function Label({ piece, index }: { piece: Piece; index: number }) {
  return (
    <figcaption className="gallery-label">
      <p className="gallery-label__code">
        {String(index).padStart(2, '0')} {piece.code ? `— ${piece.code}` : ''}
      </p>
      <h2>{piece.title}</h2>
      <p className="gallery-label__material">{piece.material}</p>
      {piece.dimensions ? (
        <p className="gallery-label__dimensions">{piece.dimensions}</p>
      ) : null}
      <p className="gallery-label__form">{piece.form}</p>
    </figcaption>
  );
}

export function CollectionPage() {
  const { locale, t } = useI18n();

  return (
    <SiteChrome>
      <main className="collection-experience collection-library">
        <section className="material-intro" aria-labelledby="collection-title">
          <div className="material-intro__copy">
            <GalleryBreadcrumb items={[{ href: '/', label: 'Stone Werkz' }, { label: t.chrome.collection }]} />
            <p className="collection-eyebrow">ST WERKZ / THE MATERIAL LIBRARY</p>
            <h1 id="collection-title">{locale === 'en' ? <>Nature, in<br /><em>its own handwriting.</em></> : <>{t.collection.titleBefore}<em>{t.collection.titleEm}</em></>}</h1>
            <p className="speakable material-intro__description">{locale === 'en' ? 'Follow a vein. Find a colour. Discover the character of marble, onyx and travertine, from a stone face to a finished object.' : t.definitions.collection}</p>
            <a href="#collection-materials" className="collection-link">Explore the six collections <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <div className="material-intro__samples" aria-label="Natural stone samples">
            <figure className="material-intro__sample material-intro__sample--white"><img src="/gallery/stone-faces/ziarat-white.jpg" alt="Original Ziarat White marble face with fine diagonal grey veins" width={1536} height={1024} fetchPriority="high" decoding="async" data-testid="img-collection-cover" /><figcaption>ZIARAT WHITE / MARBLE</figcaption></figure>
            <figure className="material-intro__sample material-intro__sample--amber"><img src="/gallery/stone-faces/orange-onyx.jpg" alt="Original Orange Onyx stone face with warm orange bands and pale mineral lines" width={1536} height={1024} decoding="async" /><figcaption>ORANGE ONYX / NATURAL MOVEMENT</figcaption></figure>
            <span className="material-intro__notation" aria-hidden="true">No two veins<br />tell the same story.</span>
          </div>
        </section>

        <nav className="material-index" aria-label="Material collections">
          {rooms.map(room => <a key={room.slug} href={`#material-${room.slug}`}><span>{room.roman}</span>{localizedRoom(room, locale).title}<ArrowUpRight size={15} aria-hidden="true" /></a>)}
        </nav>

        <section id="collection-materials" className="material-atlas" aria-labelledby="collection-materials-title">
          <div className="material-atlas__heading"><p className="collection-eyebrow">SIX COLLECTIONS / A CLOSER LOOK</p><h2 id="collection-materials-title">The character<br /><em>is in the detail.</em></h2><p>A material to build around.<br />An object to live with.</p></div>
          <div className="material-atlas__grid">
            {rooms.map(room => {
              const localRoom = localizedRoom(room, locale);
              const works = piecesInRoom(room.slug);
              const photograph = materialPhotographs[room.slug];
              return <article id={`material-${room.slug}`} className={`material-study material-study--${room.slug}`} key={room.slug}>
                <Link href={roomHref(room.slug)} className="material-study__link" data-testid={`link-room-${room.slug}`}>
                  <figure className="material-study__photograph"><img src={photograph.image} alt={photograph.alt} width={1200} height={900} loading="lazy" decoding="async" data-testid={`img-room-cover-${room.slug}`} /><figcaption>{photograph.caption}</figcaption><span className="material-study__roman" aria-hidden="true">{room.roman}</span></figure>
                  <div className="material-study__copy"><p className="collection-eyebrow">{t.collection.roomLine(room.roman, String(works.length).padStart(2, '0'))}</p><h3>{localRoom.title}</h3><p>{localRoom.wallText}</p><span className="collection-link">{t.collection.enterRoom}<ArrowUpRight size={17} aria-hidden="true" /></span></div>
                </Link>
              </article>;
            })}
          </div>
        </section>

        <section className="collection-space-links" aria-labelledby="collection-spaces-title">
          <div><p className="collection-eyebrow">FROM THE MATERIAL TO YOUR HOME</p><h2 id="collection-spaces-title">Have a space in mind?</h2><p>Explore accessories by the way you live.</p></div>
          <nav aria-label="Find products by space">
            <Link href="/products#kitchen" data-testid="link-category-kitchen"><span>01</span>Kitchen<ArrowUpRight size={20} aria-hidden="true" /></Link>
            <Link href="/products#washroom" data-testid="link-category-washroom"><span>02</span>Washroom<ArrowUpRight size={20} aria-hidden="true" /></Link>
            <Link href="/products#home-decor" data-testid="link-category-home-decor"><span>03</span>Room &amp; home decor<ArrowUpRight size={20} aria-hidden="true" /></Link>
          </nav>
        </section>
      </main>
    </SiteChrome>
  );
}

export function RoomPage({ params }: { params?: RouteParams }) {
  const { locale, t } = useI18n();
  const room = getRoom(params?.room);
  const works = room ? piecesInRoom(room.slug).map((piece) => localizedPiece(piece, locale)) : [];
  const localRoom = room ? localizedRoom(room, locale) : undefined;

  if (!room || !localRoom) {
    return (
      <SiteChrome>
        <main className="mx-auto max-w-xl px-6 py-40 text-center">
          <h1 className="font-display text-5xl">{t.collection.roomNotHung}</h1>
          <Link href="/collection" className="mt-8 inline-block text-[10px] uppercase tracking-[.2em]">{t.collection.returnCollection}</Link>
        </main>
      </SiteChrome>
    );
  }

  return (
    <SiteChrome>
      <main className="gallery-room">
        <section className="gallery-room__heading" aria-labelledby="gallery-room-title">
          <GalleryBreadcrumb items={[{ href: '/', label: 'Stone Werkz' }, { href: '/collection', label: t.chrome.collection }, { label: localRoom.title }]} />
          <div><p className="collection-eyebrow">{t.collection.roomLine(localRoom.roman, String(works.length).padStart(2, '0'))}</p><h1 id="gallery-room-title">{localRoom.title}</h1></div>
          <p>{t.definitions.room(localRoom.title, localRoom.wallText)}</p>
        </section>
        <nav className="gallery-room__nav" aria-label="Material collections">{rooms.map(item => <Link href={roomHref(item.slug)} key={item.slug} aria-current={item.slug === room.slug ? 'page' : undefined}>{localizedRoom(item, locale).title}</Link>)}</nav>
        {works.length ? <section className="gallery-room__grid" aria-label={localRoom.title}>
          {works.map((piece, index) => <article key={piece.slug} className="gallery-room__card" data-testid={`card-piece-${piece.slug}`}>
            <Link href={pieceHref(piece)}><figure><div className="gallery-room__photo"><img src={originalCatalogImage(piece.images[0])} alt={t.seo.pieceAlt(piece.title, piece.material)} width={700} height={700} loading="lazy" decoding="async" /><span aria-hidden="true"><ArrowUpRight size={18} /></span></div><Label piece={piece} index={index + 1} /></figure></Link>
          </article>)}
        </section> : <section className="gallery-room__empty"><h2>Let’s find the right stone.</h2><p>Tell the studio what you’re planning. Ask about the stone, finish and available pieces in this collection.</p><Link href={quoteHref()} className="collection-link">{getB2BCopy(locale).inquireForQuote}<ArrowUpRight size={17} aria-hidden="true" /></Link></section>}
      </main>
    </SiteChrome>
  );
}

export function PiecePage({ params }: { params?: RouteParams }) {
  const { locale, t } = useI18n();
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => setActiveImage(0), [params?.room, params?.piece]);
  const rawPiece = getPiece(params?.room, params?.piece);
  const rawRoom = getRoom(params?.room);

  if (!rawPiece || !rawRoom) {
    return (
      <SiteChrome>
        <main className="mx-auto max-w-xl px-6 py-40 text-center">
          <h1 className="font-display text-5xl">{t.collection.workNotOnView}</h1>
          <Link href="/collection" className="mt-8 inline-block text-[10px] uppercase tracking-[.2em]">
            {t.collection.returnCollection}
          </Link>
        </main>
      </SiteChrome>
    );
  }

  const piece = localizedPiece(rawPiece, locale);
  const room = localizedRoom(rawRoom, locale);
  const related = relatedPieces(rawPiece).map((entry) => localizedPiece(entry, locale));
  const roomIndex = piecesInRoom(piece.room).findIndex((entry) => entry.slug === piece.slug) + 1;
  const shownImage = Math.min(activeImage, piece.images.length - 1);
  const selectImage = (index: number) => setActiveImage((index + piece.images.length) % piece.images.length);
  const record = getWorkRecord(rawPiece);
  const cite = t.seo.pieceCite(
    piece.title,
    piece.form,
    piece.material,
    t.evidence[record.evidence],
    piece.dimensions,
  );

  return (
    <SiteChrome>
      <main className="gallery-piece pt-28 sm:pt-32">
        <section className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <GalleryBreadcrumb
            items={[
              { href: '/', label: 'Stone Werkz' },
              { href: '/collection', label: t.chrome.collection },
              { href: roomHref(piece.room), label: room.title },
              { label: piece.title },
            ]}
          />
        </section>

        <section className="gallery-piece__layout mx-auto mt-8 grid max-w-[1440px] gap-12 px-6 pb-24 sm:px-10 lg:grid-cols-[1.35fr_.65fr] lg:px-16 lg:pb-32">
          <div className="piece-photographs" data-story-ignore>
            {piece.video && (
              <figure className="overflow-hidden bg-[#1c1c1c] aspect-video w-full">
                <video
                  src={piece.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              </figure>
            )}
            <figure className="piece-photographs__main">
              <img src={originalCatalogImage(piece.images[shownImage])} alt={t.seo.pieceAlt(piece.title, piece.material, piece.images.length > 1 ? shownImage : undefined)} fetchPriority={!piece.video ? 'high' : undefined} decoding="async" data-testid="img-piece-hero" />
              <span className="piece-photographs__position" aria-live="polite">{String(shownImage + 1).padStart(2, '0')} / {String(piece.images.length).padStart(2, '0')}</span>
              {piece.images.length > 1 && <div className="piece-photographs__arrows"><button type="button" aria-label="Previous photograph" onClick={() => selectImage(shownImage - 1)} data-testid="button-piece-photo-previous"><ChevronLeft size={19} aria-hidden="true" /></button><button type="button" aria-label="Next photograph" onClick={() => selectImage(shownImage + 1)} data-testid="button-piece-photo-next"><ChevronRight size={19} aria-hidden="true" /></button></div>}
            </figure>
            {piece.images.length > 1 && <div className="piece-photographs__thumbnails" role="group" aria-label="Product photographs">{piece.images.map((image,index) => <button type="button" id={`photo-${piece.slug}-${index}`} key={image} aria-label={`View photograph ${index + 1} of ${piece.images.length}: ${piece.title}`} aria-pressed={index === shownImage} onClick={() => selectImage(index)} onKeyDown={event => {
              const next = event.key === 'ArrowRight' ? (index + 1) % piece.images.length : event.key === 'ArrowLeft' ? (index + piece.images.length - 1) % piece.images.length : event.key === 'Home' ? 0 : event.key === 'End' ? piece.images.length - 1 : -1;
              if (next < 0) return;
              event.preventDefault(); selectImage(next); document.getElementById(`photo-${piece.slug}-${next}`)?.focus();
            }} data-testid={`button-piece-photo-${index + 1}`}><img src={originalCatalogImage(image)} alt="" width={78} height={78} loading="lazy" decoding="async" /></button>)}</div>}
            <p className="piece-photographs__caption">{piece.code} / {piece.title}</p>
          </div>
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-monoish text-[10px] text-[#f6f3ec]/40">
              {room.roman} / {String(roomIndex).padStart(2, '0')} {piece.code ? `— ${piece.code}` : ''}
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[.9] tracking-[-.03em] sm:text-6xl">{piece.title}</h1>
            <p className="speakable mt-6 max-w-sm text-sm leading-7 text-[#f6f3ec]/70" data-testid="text-piece-definition">
              {t.definitions.piece(piece.title, piece.material, piece.form, room.title)}
            </p>
            <dl className="mt-10 space-y-5 border-t border-white/12 pt-8 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/40">{t.collection.stone}</dt>
                <dd className="mt-2 text-[#f6f3ec]/80">{piece.material}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/40">{t.collection.form}</dt>
                <dd className="mt-2 text-[#f6f3ec]/80">{piece.form}</dd>
              </div>
              {piece.dimensions ? (
                <div>
                  <dt className="text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/40">{t.collection.dimensions}</dt>
                  <dd className="mt-2 text-[#f6f3ec]/80">{piece.dimensions}</dd>
                </div>
              ) : null}
            </dl>
            <p className="mt-8 max-w-sm text-sm leading-7 text-[#f6f3ec]/62">{piece.note}</p>
            <WorkTombstone
              maker={principal.name}
              studioCity={t.collection.studioCity}
              stoneLabel={t.materials[record.stoneFamily].label}
              finishLabel={t.finishes[record.finish].label}
              evidenceLabel={t.evidence[record.evidence]}
              reviewed={KNOWLEDGE_REVIEWED}
              cite={cite}
            />
            <Link
              href={quoteHref({ code: piece.code, name: piece.title })}
              className="stone-surface marble-surface spring-hover mt-10 inline-flex items-center gap-4 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.2em]"
              data-testid="link-piece-viewing"
            >
              {getB2BCopy(locale).inquireForQuote} <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
            {SHOW_PRICING && (
              <Link
                href={estimateHrefForPiece(piece)}
                className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/55"
                data-testid="link-piece-estimate"
              >
                {t.collection.estimateSimilar} <ArrowUpRight size={13} strokeWidth={1.5} />
              </Link>
            )}
          </aside>
        </section>

        {related.length > 0 ? (
          <section className="border-t border-white/10 px-6 py-20 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-[1440px]">
              <p className="font-monoish text-[10px] text-[#f6f3ec]/45">{t.collection.sameRoom}</p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">{t.collection.otherWorks}</h2>
              <div className="mt-12 grid gap-10 sm:grid-cols-3">
                {related.map((entry) => (
                  <Link key={entry.slug} href={pieceHref(entry)} className="gallery-piece__related-link block">
                    <div className="gallery-piece__related-photo">
                      <img src={originalCatalogImage(entry.images[0])} alt={t.seo.pieceAlt(entry.title, entry.material)} width={600} height={450} loading="lazy" decoding="async" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl leading-none">{entry.title}</h3>
                    <p className="mt-2 text-[10px] uppercase tracking-[.14em] text-[#f6f3ec]/50">{entry.material}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </SiteChrome>
  );
}
