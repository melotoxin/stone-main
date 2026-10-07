import { useEffect, useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import {
  composeSlabBrief,
  computeSlabProject,
  defaultSlabDraft,
  formatAreaSqFt,
  formatStonePkr,
  pakistanStones,
  persistSlabBrief,
  slabEnquireHref,
  type AreaUnit,
  type SlabProjectDraft,
} from '@/data/pakistan-stones';
import { formatPkr, formatUsd } from '@/data/estimate';
import { useI18n } from '@/i18n';
import { SHOW_PRICING } from '@/data/b2b';

type Tone = 'ink' | 'paper';
type Mode = 'project' | 'export';

export function ProjectSlabCalculator({
  mode = 'project',
  tone = 'ink',
  id = 'project-estimate',
  onApply,
}: {
  mode?: Mode;
  tone?: Tone;
  id?: string;
  onApply?: (payload: { brief: string; port: string; stoneName: string }) => void;
}) {
  const { t } = useI18n();
  const copy = t.projectCalc;
  const [draft, setDraft] = useState<SlabProjectDraft>(() => defaultSlabDraft(mode));
  const live = useMemo(() => computeSlabProject(draft), [draft]);
  const [lastValid, setLastValid] = useState(live);

  useEffect(() => {
    if (live.valid) setLastValid(live);
  }, [live]);

  const result = live.valid ? live : lastValid;
  const dark = tone === 'ink';
  const fieldClass = dark
    ? 'mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base outline-none placeholder:text-white/35 focus:border-white'
    : 'mt-3 w-full border-0 border-b border-[#0c0c0c]/25 bg-transparent px-0 py-3 text-base outline-none placeholder:text-[#0c0c0c]/35 focus:border-[#0c0c0c]';
  const labelClass = dark ? 'font-monoish text-[9px] text-white/45' : 'font-monoish text-[9px] text-[#0c0c0c]/45';
  const muted = dark ? 'text-white/55' : 'text-[#0c0c0c]/55';
  const panel = dark ? 'border border-white/15 bg-white/5 p-7 sm:p-10' : 'border border-[#0c0c0c]/15 bg-white/40 p-7 sm:p-10';

  const setField = <K extends keyof SlabProjectDraft>(key: K, value: SlabProjectDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const enquireTo = slabEnquireHref(draft, result, mode);

  return (
    <div id={id} className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-start" data-testid={`calc-slab-${mode}`}>
      <form className="space-y-8" onSubmit={(event) => event.preventDefault()} data-testid={`form-slab-${mode}`}>
        <label className="block">
          <span className={labelClass}>{copy.stone}</span>
          <select
            value={draft.stoneId}
            onChange={(event) => setField('stoneId', event.target.value)}
            className={fieldClass}
            data-testid={`select-slab-stone-${mode}`}
          >
            {pakistanStones.map((stone) => (
              <option key={stone.id} value={stone.id}>
                {stone.name}{SHOW_PRICING ? ` · ${formatStonePkr(stone)} / sq ft` : ''}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <span className={labelClass}>{copy.area}</span>
          <div className={`flex border ${dark ? 'border-white/20' : 'border-[#0c0c0c]/18'}`} role="group" aria-label={copy.areaUnits}>
            {(['sqft', 'm2'] as AreaUnit[]).map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => setField('unit', unit)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-[.16em] ${
                  draft.unit === unit
                    ? dark
                      ? 'bg-white text-[#111111]'
                      : 'bg-[#0c0c0c] text-[#f6f3ec]'
                    : muted
                }`}
                data-testid={`toggle-slab-unit-${unit}-${mode}`}
              >
                {unit === 'sqft' ? copy.unitSqFt : copy.unitM2}
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="sr-only">{copy.area}</span>
          <input
            type="number"
            min={1}
            step={draft.unit === 'm2' ? 0.5 : 1}
            value={Number.isFinite(draft.area) ? draft.area : ''}
            onChange={(event) => {
              const numeric = Number(event.target.value);
              if (Number.isFinite(numeric) && numeric > 0) setField('area', numeric);
            }}
            className={fieldClass}
            data-testid={`input-slab-area-${mode}`}
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>{copy.thickness}</span>
            <input
              type="number"
              min={8}
              max={80}
              step={1}
              value={draft.thicknessMm}
              onChange={(event) => {
                const numeric = Number(event.target.value);
                if (Number.isFinite(numeric) && numeric > 0) setField('thicknessMm', numeric);
              }}
              className={fieldClass}
              data-testid={`input-slab-thickness-${mode}`}
            />
          </label>
          <label className="block">
            <span className={labelClass}>{copy.wastage}</span>
            <input
              type="number"
              min={0}
              max={40}
              step={1}
              value={draft.wastagePct}
              onChange={(event) => {
                const numeric = Number(event.target.value);
                if (Number.isFinite(numeric) && numeric >= 0) setField('wastagePct', numeric);
              }}
              className={fieldClass}
              data-testid={`input-slab-wastage-${mode}`}
            />
          </label>
        </div>
        <p className={`text-[11px] leading-5 ${muted}`}>{copy.thicknessNote}</p>

        {mode === 'export' ? (
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className={labelClass}>{copy.port}</span>
              <input
                type="text"
                value={draft.port}
                placeholder={copy.portPlaceholder}
                onChange={(event) => setField('port', event.target.value)}
                className={fieldClass}
                data-testid={`input-slab-port-${mode}`}
              />
            </label>
            <label className="block">
              <span className={labelClass}>{copy.crates}</span>
              <input
                type="number"
                min={1}
                max={40}
                step={1}
                value={draft.crates}
                onChange={(event) => {
                  const numeric = Number(event.target.value);
                  if (Number.isFinite(numeric) && numeric >= 1) setField('crates', numeric);
                }}
                className={fieldClass}
                data-testid={`input-slab-crates-${mode}`}
              />
            </label>
          </div>
        ) : null}
        {mode === 'export' ? <p className={`text-[11px] leading-5 ${muted}`}>{copy.cratesHint}</p> : null}
      </form>

      <aside className={panel} data-testid={`panel-slab-result-${mode}`}>
        <p className={labelClass}>{copy.materialRange}</p>
        {result.valid ? (
          <div aria-live="polite">
            {SHOW_PRICING && (
              <>
                <p className="mt-5 font-display text-4xl leading-[.95] tracking-[-.03em] sm:text-5xl" data-testid={`text-slab-range-${mode}`}>
                  {formatPkr(result.lowPkr)}
                  <span className={`mx-2 font-sans text-lg tracking-normal ${dark ? 'text-white/35' : 'text-[#0c0c0c]/35'}`}>–</span>
                  {formatPkr(result.highPkr)}
                </p>
                <p className={`mt-4 text-[11px] uppercase tracking-[.14em] ${muted}`} data-testid={`text-slab-usd-${mode}`}>
                  {copy.usdLine(formatUsd(result.lowUsd), formatUsd(result.highUsd), result.usdRate)}
                </p>
              </>
            )}
            {live.valid ? null : <p className={`mt-3 text-[11px] ${muted}`}>{copy.waiting}</p>}
          </div>
        ) : (
          <p className={`mt-5 font-display text-3xl leading-tight ${muted}`} data-testid={`text-slab-invalid-${mode}`}>
            {copy.giveArea}
          </p>
        )}
        <dl className={`mt-8 space-y-4 border-t pt-6 text-sm ${dark ? 'border-white/12' : 'border-[#0c0c0c]/12'}`}>
          <div className="flex justify-between gap-4">
            <dt className={`text-[10px] uppercase tracking-[.16em] ${muted}`}>{copy.billedArea}</dt>
            <dd data-testid={`text-slab-billed-${mode}`}>{formatAreaSqFt(result.billedSqFt)}</dd>
          </div>
          {result.stone && SHOW_PRICING ? (
            <div className="flex justify-between gap-4">
              <dt className={`text-[10px] uppercase tracking-[.16em] ${muted}`}>{copy.publishedBand}</dt>
              <dd>{formatStonePkr(result.stone)} / sq ft</dd>
            </div>
          ) : null}
        </dl>
        <p className={`mt-6 text-sm leading-6 ${muted}`}>{copy.disclaimer}</p>
        {mode === 'export' ? <p className={`mt-3 text-sm leading-6 ${muted}`}>{copy.freightNote}</p> : null}
        <div className="mt-8 flex flex-wrap items-center gap-5">
          {onApply ? (
            <button
              type="button"
              onClick={() =>
                onApply({
                  brief: composeSlabBrief(draft, result, mode),
                  port: draft.port,
                  stoneName: result.stone?.name ?? draft.stoneId,
                })
              }
              className="stone-surface marble-surface spring-hover inline-flex items-center gap-4 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.2em]"
              data-testid={`button-slab-apply-${mode}`}
            >
              {copy.applyToForm} <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          ) : (
            <Link
              href={enquireTo}
              onClick={() => persistSlabBrief(draft, result, mode)}
              className="stone-surface marble-surface spring-hover inline-flex items-center gap-4 px-5 py-4 text-[10px] font-semibold uppercase tracking-[.2em]"
              data-testid={`link-slab-enquire-${mode}`}
            >
              {copy.requestQuote} <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
}
