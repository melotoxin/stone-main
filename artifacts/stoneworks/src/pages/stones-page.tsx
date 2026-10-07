import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { Link } from 'wouter';
import { SiteChrome } from '@/components/layout/SiteChrome';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useI18n } from '@/i18n';
import {
  categoryForStoneId,
  materialHref,
  materialsCards,
  type MaterialsCard,
  type MaterialsCategory,
} from '@/data/materials-gallery';
import {
  formatStonePkr,
  formatStoneUsd,
  pakistanMarbles,
  pakistanOnyxes,
  PAKISTAN_STONE_RATES_AS_OF,
  pakistanStones,
  stonePatternSrc,
  type PakistanStone,
} from '@/data/pakistan-stones';
import { SHOW_PRICING, getB2BCopy } from '@/data/b2b';
import '@/styles/material-refinements.css';

type Filter = 'all' | MaterialsCategory;

export function StonesPage() {
  const { locale, t } = useI18n();
  const b2bCopy = getB2BCopy(locale);
  const s = t.stonesIndex;
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const rows = useMemo(() => {
    const term = query.trim().toLocaleLowerCase(locale);
    return cardsForFilter(filter).filter(card => {
      const stone = pakistanStones.find(entry => entry.id === card.stoneId);
      return !term || `${card.name} ${card.colour ?? ''} ${stone?.origin ?? ''} ${stone?.alsoKnownAs.join(' ') ?? ''}`.toLocaleLowerCase(locale).includes(term);
    });
  }, [filter, query, locale]);
  const openStone = openId ? pakistanStones.find((stone) => stone.id === openId) : undefined;
  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: s.filterAll },
    { id: 'marble', label: s.filterMarble },
    { id: 'natural', label: s.filterNatural },
    { id: 'granite', label: s.filterGranite },
    { id: 'onyx', label: s.filterOnyx },
    { id: 'travertine', label: s.filterTravertine },
  ];

  useEffect(() => {
    const id = window.location.hash.replace(/^#/, '');
    if (!id) return;
    const match = pakistanStones.find((stone) => stone.id === id);
    if (!match) return;
    const category = categoryForStoneId(id);
    if (category) setFilter(category);
    setOpenId(id);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }, []);

  function openPattern(id: string) {
    setOpenId(id);
    const url = new URL(window.location.href);
    url.hash = id;
    history.replaceState(null, '', url);
  }

  function closePattern() {
    setOpenId(null);
    const url = new URL(window.location.href);
    url.hash = '';
    history.replaceState(null, '', `${url.pathname}${url.search}`);
  }

  return (
    <SiteChrome>
      <main id="stones" className="stone-browser pt-28 sm:pt-32">
        <section className="mx-auto max-w-[1440px] px-6 pb-16 sm:px-10 lg:px-16">
          <p className="font-monoish text-[10px] text-[#f6f3ec]/45">{s.kicker}</p>
          <h1 className="mt-6 max-w-3xl font-display text-6xl leading-[.86] tracking-[-.04em] sm:text-8xl">
            {s.titleBefore}
            <em>{s.titleEm}</em>
          </h1>
          <p className="speakable mt-10 max-w-xl text-sm leading-7 text-[#f6f3ec]/62">{s.body}</p>
          {SHOW_PRICING && (
            <p className="mt-6 font-monoish text-[10px] text-[#f6f3ec]/40">
              {s.ratesLine(PAKISTAN_STONE_RATES_AS_OF, pakistanMarbles.length, pakistanOnyxes.length, pakistanStones.length)}
            </p>
          )}
          <p className="mt-4 max-w-xl text-xs leading-6 text-[#f6f3ec]/50">{s.patternNote}</p>
        </section>

        <section className="stone-browser__tools mx-auto max-w-[1440px] px-6 pb-10 sm:px-10 lg:px-16" aria-label={s.filterAria}>
          <div className="stone-browser__search"><label htmlFor="stone-search"><Search size={18} aria-hidden="true" /><span>{t.luxuryHome.search}</span></label><input id="stone-search" type="search" value={query} onChange={event => setQuery(event.target.value)} aria-label={t.luxuryHome.search} placeholder={s.identify} data-testid="input-stone-search" /><span aria-live="polite">{rows.length}</span></div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={filter === item.id}
                data-testid={`button-stones-filter-${item.id}`}
                className={`border px-4 py-2 text-[10px] font-semibold uppercase tracking-[.18em] ${
                  filter === item.id
                    ? 'border-[#f6f3ec] bg-[#f6f3ec] text-[#0c0c0c]'
                    : 'border-white/18 text-[#f6f3ec]/70 hover:border-white/45'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-6 pb-24 sm:px-10 lg:px-16" aria-labelledby="stone-index-title">
          <h2 id="stone-index-title" className="sr-only">
            {s.srTitle}
          </h2>
          {rows.length === 0 ? (
            <p className="max-w-md text-sm leading-7 text-[#f6f3ec]/55">{query.trim() ? t.luxuryHome.noResults : s.emptyCategory || t.luxuryHome.noResults}</p>
          ) : (
            <ol className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((card, index) => {
                const stone = card.stoneId ? pakistanStones.find((entry) => entry.id === card.stoneId) : undefined;
                return (
                  <li key={card.id} id={card.stoneId ?? card.id} data-testid={`stone-${card.stoneId ?? card.id}`}>
                    {card.kind === 'project' ? (
                      <ProjectCard card={card} />
                    ) : stone ? (
                      <StoneCard
                        stone={stone}
                        priority={index < 3}
                        onOpen={() => openPattern(stone.id)}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          )}
        </section>

        <section className="border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
          <div className="mx-auto max-w-[1440px]">
            <p className="font-monoish text-[10px] text-[#f6f3ec]/45">{s.afterKicker}</p>
            <h2 className="mt-5 max-w-xl font-display text-5xl leading-[.9] tracking-[-.03em] sm:text-7xl">
              {s.afterTitleBefore}
              <em>{s.afterTitleEm}</em>
            </h2>
            <p className="mt-8 max-w-lg text-sm leading-7 text-[#f6f3ec]/62">{s.afterBody}</p>
            <div className="mt-10 flex flex-col items-start gap-6">
              {SHOW_PRICING && (
                <Link
                  href="/estimate"
                  className="group inline-flex items-center gap-4 border-b border-[#f6f3ec] pb-2 text-[10px] font-semibold uppercase tracking-[.18em]"
                  data-testid="link-stones-estimate"
                >
                  {s.estimateCta} <ArrowRight size={15} strokeWidth={1.4} className="transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              <Link
                href="/export"
                className="group inline-flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[.18em] text-[#f6f3ec]/55"
                data-testid="link-stones-export"
              >
                {s.exportCta} <ArrowRight size={15} strokeWidth={1.4} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/enquire"
                className="group inline-flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[.18em] text-[#f6f3ec]/55"
                data-testid="link-stones-enquire"
              >
                {s.enquireCta} <ArrowRight size={15} strokeWidth={1.4} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Dialog
        open={Boolean(openStone)}
        onOpenChange={(next) => {
          if (!next) closePattern();
        }}
      >
        <DialogContent
          className="max-h-[92svh] max-w-5xl overflow-x-hidden overflow-y-auto border-white/20 bg-[#111111] p-0 text-[#f6f3ec] sm:rounded-none [&>button.right-4]:hidden"
          aria-describedby="stone-pattern-desc"
        >
          {openStone ? (
            <>
              <DialogTitle className="sr-only">{openStone.name}</DialogTitle>
              <DialogDescription id="stone-pattern-desc" className="sr-only">
                {s.imageAlt(openStone.name, openStone.colour)}
              </DialogDescription>
              <button
                type="button"
                onClick={closePattern}
                className="absolute end-4 top-4 z-10 p-2 text-[#f6f3ec]/80 hover:text-[#f6f3ec]"
                aria-label={s.closePattern}
                data-testid="button-close-stone-pattern"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
              <img
                src={stonePatternSrc(openStone)}
                alt={s.imageAlt(openStone.name, openStone.colour)}
                className="max-h-[45svh] w-full bg-[#0c0c0c] object-contain sm:max-h-[60vh]"
              />
              <div className="grid gap-4 px-6 py-6 sm:grid-cols-[1.2fr_.8fr] sm:px-8">
                <div>
                  <p className="font-monoish text-[9px] text-[#f6f3ec]/45">{s.identify}</p>
                  <h3 className="mt-2 font-display text-3xl leading-none sm:text-4xl">{openStone.name}</h3>
                  <p className="mt-3 text-[11px] uppercase tracking-[.14em] text-[#f6f3ec]/55">
                    {s.families[openStone.family]} · {openStone.colour}
                  </p>
                  {openStone.alsoKnownAs.length > 0 ? (
                    <p className="mt-3 text-xs leading-5 text-[#f6f3ec]/50">
                      {s.also} {openStone.alsoKnownAs.join(', ')}
                    </p>
                  ) : null}
                </div>
                <div>
                  <p className="text-sm leading-6 text-[#f6f3ec]/70">{openStone.origin}</p>
                  <p className="mt-2 text-xs leading-5 text-[#f6f3ec]/50">{openStone.use}</p>
                  <p className="mt-4 font-monoish text-[10px] text-[#f6f3ec]/45">{s.grades[openStone.grade]}</p>
                  <Link href={`/enquire?${new URLSearchParams({ intent: 'sample', brief: `${openStone.name} — ${openStone.colour}` })}`} className="stone-browser__sample" data-testid="link-stone-sample">{t.luxuryHome.sample}<ArrowRight size={16} aria-hidden="true" /></Link>
                  {SHOW_PRICING && (
                    <>
                      <p className="mt-2 text-sm font-semibold">{formatStonePkr(openStone)}</p>
                      <p className="mt-1 text-[11px] text-[#f6f3ec]/45">{formatStoneUsd(openStone)}</p>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </SiteChrome>
  );
}

function cardsForFilter(filter: Filter): MaterialsCard[] {
  if (filter === 'all') {
    return pakistanStones.map((stone) => ({
      id: `swatch-${stone.id}`,
      kind: 'swatch',
      category: categoryForStoneId(stone.id) ?? 'marble',
      name: stone.name,
      image: stonePatternSrc(stone),
      colour: stone.colour,
      stoneId: stone.id,
    }));
  }
  return materialsCards(filter);
}

function ProjectCard({ card }: { card: MaterialsCard }) {
  const { t } = useI18n();
  const href = materialHref(card);
  const inner = (
    <>
      <div className="aspect-[4/3] overflow-hidden bg-[#1c1c1c]">
        <img
          src={card.image}
          alt={t.stonesIndex.projectAlt(card.name)}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <p className="mt-5 font-monoish text-[9px] uppercase tracking-[.16em] text-[#f6f3ec]/45">{t.stonesIndex.projectKind}</p>
      <p className="mt-2 font-display text-2xl leading-tight sm:text-3xl">{card.name}</p>
      {card.colour ? (
        <p className="mt-2 text-[11px] uppercase tracking-[.14em] text-[#f6f3ec]/45">{card.colour}</p>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="group block" data-testid={`link-stone-project-${card.id}`}>
        {inner}
      </Link>
    );
  }

  return <article className="group">{inner}</article>;
}

function StoneCard({
  stone,
  onOpen,
  priority = false,
}: {
  stone: PakistanStone;
  onOpen: () => void;
  priority?: boolean;
}) {
  const { t } = useI18n();
  const s = t.stonesIndex;
  return (
    <article>
      <button
        type="button"
        onClick={onOpen}
        className="group block w-full text-start"
        data-testid={`button-stone-pattern-${stone.id}`}
        aria-label={`${s.openPattern}: ${stone.name}`}
      >
        <div className="aspect-[4/3] overflow-hidden bg-[#1c1c1c]">
          <img
            src={stonePatternSrc(stone)}
            alt={s.imageAlt(stone.name, stone.colour)}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'low'}
            decoding="async"
          />
        </div>
      </button>
      <p className="mt-5 font-monoish text-[9px] uppercase tracking-[.16em] text-[#f6f3ec]/45">{s.swatchKind}</p>
      <p className="mt-2 font-display text-2xl leading-tight sm:text-3xl">{stone.name}</p>
      <p className="mt-2 text-[11px] uppercase tracking-[.14em] text-[#f6f3ec]/45">
        {s.families[stone.family]} · {stone.colour}
      </p>
      {stone.alsoKnownAs.length > 0 ? (
        <p className="mt-2 max-w-sm text-xs leading-5 text-[#f6f3ec]/48">
          {s.also} {stone.alsoKnownAs.join(', ')}
        </p>
      ) : null}
      <p className="mt-3 text-sm leading-6 text-[#f6f3ec]/62">{stone.origin}</p>
      <p className="mt-2 text-xs leading-5 text-[#f6f3ec]/48">{stone.use}</p>
      <p className="mt-4 font-monoish text-[10px] text-[#f6f3ec]/50">{s.grades[stone.grade]}</p>
      {SHOW_PRICING && (
        <>
          <p className="mt-1 text-sm font-semibold tracking-[-.01em]">{formatStonePkr(stone)}</p>
          <p className="mt-1 text-[11px] text-[#f6f3ec]/45">{formatStoneUsd(stone)}</p>
          <p className="sr-only">{s.rateDescribe(stone.colour, stone.origin, formatStonePkr(stone))}</p>
        </>
      )}
    </article>
  );
}
