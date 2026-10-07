import { useEffect, useMemo, useState } from 'react';
import { Link, useSearch } from 'wouter';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SiteChrome } from '@/components/layout/SiteChrome';
import { pieces } from '@/data/gallery';
import { localizedLead, localizedPiece, useI18n } from '@/i18n';
import {
  applyCommissionDefaults,
  areaM2,
  commissions,
  computeEstimate,
  convertDraftUnit,
  defaultDraft,
  dimensionSummary,
  draftFromSearch,
  enquireHref,
  finishAllowed,
  finishes,
  formatArea,
  formatPkr,
  formatUsd,
  persistBrief,
  shapes,
  stones,
  type CommissionKind,
  type DimUnit,
  type EstimateDraft,
  type FinishKind,
  type ShapeKind,
  type StoneFamily,
} from '@/data/estimate';
import { SHOW_PRICING } from '@/data/b2b';

function Choice<T extends string>({
  label,
  value,
  selected,
  note,
  disabled,
  onSelect,
  testId,
}: {
  label: string;
  value: T;
  selected: boolean;
  note?: string;
  disabled?: boolean;
  onSelect: (value: T) => void;
  testId: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(value)}
      data-testid={testId}
      className={`border px-4 py-3 text-left transition-colors ${
        disabled
          ? 'cursor-not-allowed border-white/10 text-[#f6f3ec]/30'
          : selected
            ? 'border-[#f6f3ec] bg-[#f6f3ec] text-[#0c0c0c]'
            : 'border-white/18 hover:border-white/45'
      }`}
    >
      <span className="block text-[11px] uppercase tracking-[.16em]">{label}</span>
      {note ? (
        <span className={`mt-1 block text-[11px] normal-case tracking-normal ${selected ? 'text-[#0c0c0c]/65' : 'text-[#f6f3ec]/50'}`}>
          {note}
        </span>
      ) : null}
    </button>
  );
}

function DimensionField({
  label,
  value,
  onChange,
  testId,
  unit,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  testId: string;
  unit: DimUnit;
}) {
  const [text, setText] = useState(formatDim(value));

  useEffect(() => {
    setText(formatDim(value));
  }, [value]);

  return (
    <label className="block min-w-0 flex-1">
      <span className="font-monoish text-[9px] text-[#f6f3ec]/45">{label}</span>
      <input
        type="number"
        min={unit === 'cm' ? 1 : 0.4}
        step={unit === 'cm' ? 1 : 0.1}
        value={text}
        onChange={(event) => {
          const next = event.target.value;
          setText(next);
          const numeric = Number(next);
          if (Number.isFinite(numeric) && numeric > 0) onChange(numeric);
        }}
        className="mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base outline-none focus:border-[#f6f3ec]"
        data-testid={testId}
      />
    </label>
  );
}

function formatDim(value: number) {
  if (!Number.isFinite(value)) return '';
  return Number.isInteger(value) ? String(value) : String(value);
}

export function EstimatePage() {
  const search = useSearch();
  const { locale, t } = useI18n();
  const [draft, setDraft] = useState<EstimateDraft>(() => draftFromSearch(search));

  useEffect(() => {
    const next = draftFromSearch(search);
    setDraft(next);
    setLastValid(computeEstimate(next));
  }, [search]);

  const live = useMemo(() => computeEstimate(draft), [draft]);
  const [lastValid, setLastValid] = useState(live);
  useEffect(() => {
    if (live.valid) setLastValid(live);
  }, [live]);
  const result = live.valid ? live : lastValid;
  const work = draft.workSlug ? pieces.find((piece) => piece.slug === draft.workSlug) : undefined;
  const localWork = work ? localizedPiece(work, locale) : undefined;
  const roundPlan = draft.shape === 'round';
  const enquireTo = enquireHref(draft, result);
  const lead = localizedLead(draft, locale);

  const setField = <K extends keyof EstimateDraft>(key: K, value: EstimateDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  return (
    <SiteChrome>
      <main className="pt-28 sm:pt-32 pb-20 lg:pb-0">
        <section className="mx-auto max-w-[1440px] px-6 pb-10 sm:px-10 lg:px-16">
          <p className="font-monoish text-[10px] text-[#f6f3ec]/45">{t.estimate.kicker}</p>
          <h1 className="mt-6 max-w-3xl font-display text-6xl leading-[.84] tracking-[-.04em] sm:text-8xl">
            {t.estimate.titleBefore}<em>{t.estimate.titleEm}</em>
          </h1>
          <p className="speakable mt-8 max-w-lg text-sm leading-7 text-[#f6f3ec]/62">
            {t.definitions.estimate}
          </p>
          {localWork ? (
            <p className="mt-8 max-w-md border-s border-white/20 ps-4 text-sm leading-6 text-[#f6f3ec]/70">
              {t.estimate.takingAsStart(localWork.title)}
              <Link href={`/collection/${localWork.room}/${localWork.slug}`} className="mt-2 block text-[10px] uppercase tracking-[.16em]" data-testid="link-estimate-source-piece">
                {t.estimate.viewWork}
              </Link>
            </p>
          ) : null}
        </section>

        <section className="mx-auto grid max-w-[1440px] gap-16 px-6 pb-36 sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start lg:px-16 lg:pb-28">
          <form className="space-y-12" onSubmit={(event) => event.preventDefault()} data-testid="form-estimate">
            <fieldset>
              <legend className="font-monoish text-[10px] text-[#f6f3ec]/45">{t.estimate.whatCommissioning}</legend>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {commissions.map((item) => (
                  <Choice
                    key={item.id}
                    label={t.estimate.commissions[item.id].label}
                    note={t.estimate.commissions[item.id].note}
                    value={item.id}
                    selected={draft.commission === item.id}
                    onSelect={(value: CommissionKind) => setDraft((current) => applyCommissionDefaults(current, value))}
                    testId={`choice-commission-${item.id}`}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-monoish text-[10px] text-[#f6f3ec]/45">{t.estimate.stoneFamily}</legend>
              <div className="mt-5 grid grid-cols-2 gap-2">
                {stones.map((item) => (
                  <Choice
                    key={item.id}
                    label={t.estimate.stones[item.id].label}
                    note={t.estimate.stones[item.id].note}
                    value={item.id}
                    selected={draft.stone === item.id}
                    onSelect={(value: StoneFamily) =>
                      setDraft((current) => ({
                        ...current,
                        stone: value,
                        finish: finishAllowed(value, current.finish) ? current.finish : 'polished',
                      }))
                    }
                    testId={`choice-stone-${item.id}`}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-monoish text-[10px] text-[#f6f3ec]/45">{t.estimate.finish}</legend>
              <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {finishes.map((item) => {
                  const allowed = finishAllowed(draft.stone, item.id);
                  return (
                    <Choice
                      key={item.id}
                      label={t.estimate.finishes[item.id].label}
                      note={item.id === 'backlit' && !allowed ? t.estimate.needsOnyx : t.estimate.finishes[item.id].note}
                      value={item.id}
                      selected={draft.finish === item.id}
                      disabled={!allowed}
                      onSelect={(value: FinishKind) => setField('finish', value)}
                      testId={`choice-finish-${item.id}`}
                    />
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-monoish text-[10px] text-[#f6f3ec]/45">{t.estimate.shape}</legend>
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {shapes.map((item) => (
                  <Choice
                    key={item.id}
                    label={t.estimate.shapes[item.id]}
                    value={item.id}
                    selected={draft.shape === item.id}
                    onSelect={(value: ShapeKind) => setField('shape', value)}
                    testId={`choice-shape-${item.id}`}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <legend className="font-monoish text-[10px] text-[#f6f3ec]/45">{t.estimate.dimensions}</legend>
                <div className="flex border border-white/18" role="group" aria-label={t.estimate.dimensionUnits}>
                  {(['cm', 'in'] as DimUnit[]).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setDraft((current) => convertDraftUnit(current, unit))}
                      className={`px-3 py-1.5 text-[10px] uppercase tracking-[.16em] ${
                        draft.unit === unit ? 'bg-[#f6f3ec] text-[#0c0c0c]' : 'text-[#f6f3ec]/55'
                      }`}
                      data-testid={`toggle-unit-${unit}`}
                    >
                      {unit === 'cm' ? 'cm' : t.estimate.inches}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-6 sm:flex-row">
                <DimensionField
                  label={roundPlan ? t.estimate.diameter(draft.unit) : t.estimate.length(draft.unit)}
                  value={draft.length}
                  onChange={(value) => setField('length', value)}
                  testId="input-estimate-length"
                  unit={draft.unit}
                />
                {roundPlan ? null : (
                  <DimensionField
                    label={t.estimate.width(draft.unit)}
                    value={draft.width}
                    onChange={(value) => setField('width', value)}
                    testId="input-estimate-width"
                    unit={draft.unit}
                  />
                )}
                <DimensionField
                  label={draft.commission === 'sink' || draft.commission === 'object' ? t.estimate.depthHeight(draft.unit) : t.estimate.thickness(draft.unit)}
                  value={draft.thickness}
                  onChange={(value) => setField('thickness', value)}
                  testId="input-estimate-thickness"
                  unit={draft.unit}
                />
              </div>
              <p className="mt-4 text-[11px] leading-5 text-[#f6f3ec]/45">
                {t.estimate.planArea(formatArea(areaM2(draft)), dimensionSummary(draft))}
              </p>
            </fieldset>

            <label className="block">
              <span className="font-monoish text-[10px] text-[#f6f3ec]/45">{t.estimate.notes}</span>
              <textarea
                name="notes"
                rows={4}
                value={draft.notes}
                onChange={(event) => setField('notes', event.target.value)}
                placeholder={t.estimate.notesPlaceholder}
                className="mt-4 w-full resize-none border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#f6f3ec]/35 focus:border-[#f6f3ec]"
                data-testid="input-estimate-notes"
              />
            </label>
          </form>

          <aside className="lg:sticky lg:top-32">
            <div className="border border-white/15 bg-white/5 p-7 sm:p-10" data-testid="panel-estimate-result">
              <p className="font-monoish text-[10px] text-[#f6f3ec]/45">{t.estimate.indicativeRange}</p>
              {result.valid ? (
                <div aria-live="polite">
                  {SHOW_PRICING && (
                    <>
                      <p className="mt-5 font-display text-4xl leading-[.95] tracking-[-.03em] sm:text-5xl" data-testid="text-estimate-range">
                        {formatPkr(result.lowPkr)}
                        <span className="mx-2 font-sans text-lg tracking-normal text-[#f6f3ec]/35">–</span>
                        {formatPkr(result.highPkr)}
                      </p>
                      <p className="mt-4 text-[11px] uppercase tracking-[.14em] text-[#f6f3ec]/50" data-testid="text-estimate-usd">
                        ≈ {formatUsd(result.lowUsd)} – {formatUsd(result.highUsd)}
                      </p>
                    </>
                  )}
                  {live.valid ? null : (
                    <p className="mt-3 text-[11px] text-[#f6f3ec]/40">{t.estimate.waitingSize}</p>
                  )}
                </div>
              ) : (
                <p className="mt-5 font-display text-3xl leading-tight text-[#f6f3ec]/55" data-testid="text-estimate-invalid">
                  {t.estimate.giveSize}
                </p>
              )}
              <dl className="mt-8 space-y-4 border-t border-white/12 pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/40">{t.estimate.piece}</dt>
                  <dd>{t.estimate.commissions[draft.commission].label}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/40">{t.estimate.stoneArea}</dt>
                  <dd data-testid="text-estimate-area">{formatArea(result.areaM2)}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/40">{t.estimate.lead}</dt>
                  <dd className="mt-2 max-w-sm text-[#f6f3ec]/65" data-testid="text-estimate-lead">
                    {lead}
                  </dd>
                </div>
              </dl>
              <p className="mt-6 text-sm leading-6 text-[#f6f3ec]/55">
                {t.estimate.notFinal}
              </p>
              <Link
                href={enquireTo}
                onClick={() => persistBrief(draft, result)}
                className="stone-surface marble-surface spring-hover mt-8 inline-flex items-center gap-4 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.2em]"
                data-testid="link-request-estimate"
              >
                {t.estimate.requestThis} <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>

            <div className="mt-10 border-t border-white/12 pt-8">
              <p className="font-monoish text-[10px] text-[#f6f3ec]/45">{t.estimate.howKicker}</p>
              <h2 className="mt-4 font-display text-3xl">{t.estimate.howTitle}</h2>
              <div className="mt-5 space-y-4 text-sm leading-6 text-[#f6f3ec]/60">
                <p>
                  {t.estimate.howP1}
                </p>
                <p>
                  {t.estimate.howP2(result.usdRate)}
                </p>
                <p>
                  {t.estimate.howP3}
                </p>
              </div>
              <Link href="/enquire" className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.16em]" data-testid="link-estimate-enquire-plain">
                {t.estimate.writeWithoutRange} <ArrowUpRight size={13} strokeWidth={1.5} />
              </Link>
            </div>
          </aside>
        </section>

        {result.valid ? (
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-[#151515]/95 px-4 py-3 backdrop-blur-md lg:hidden">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
              <p className="min-w-0 text-[11px] leading-4 tracking-[.04em]">
                {SHOW_PRICING && (
                  <>
                    <span className="block text-[9px] uppercase tracking-[.16em] text-[#f6f3ec]/45">{t.estimate.indicative}</span>
                    <span className="truncate">{formatPkr(result.lowPkr)} – {formatPkr(result.highPkr)}</span>
                  </>
                )}
              </p>
              <Link
                href={enquireTo}
                onClick={() => persistBrief(draft, result)}
                className="stone-surface marble-surface shrink-0 px-4 py-3 text-[9px] font-semibold uppercase tracking-[.16em]"
                data-testid="link-request-estimate-mobile"
              >
                {t.estimate.requestThis}
              </Link>
            </div>
          </div>
        ) : null}
      </main>
    </SiteChrome>
  );
}
