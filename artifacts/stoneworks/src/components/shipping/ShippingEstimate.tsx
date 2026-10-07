import { useEffect, useMemo, useState } from 'react';
import {
  applyLiveQuote,
  computeShippingEstimate,
  defaultShippingDraft,
  shippingDestinations,
  shippingModes,
  type ShippingDestinationId,
  type ShippingDraft,
  type ShippingMode,
  type SeaBox,
} from '@/data/shipping';
import { formatPkr, formatUsd } from '@/data/estimate';
import { fetchLiveFreight } from '@/lib/freight-live';
import { useI18n } from '@/i18n';
import { SHOW_PRICING } from '@/data/b2b';

type Tone = 'dark' | 'light';

type ShippingEstimateProps = {
  tone?: Tone;
  draft?: ShippingDraft;
  onDraftChange?: (draft: ShippingDraft) => void;
  compact?: boolean;
};

export function ShippingEstimate({
  tone = 'dark',
  draft: controlled,
  onDraftChange,
  compact = false,
}: ShippingEstimateProps) {
  const { t } = useI18n();
  const s = t.shipping;
  const [internal, setInternal] = useState<ShippingDraft>(defaultShippingDraft);
  const draft = controlled ?? internal;

  const setDraft = (next: ShippingDraft) => {
    if (onDraftChange) onDraftChange(next);
    else setInternal(next);
  };

  const setField = <K extends keyof ShippingDraft>(key: K, value: ShippingDraft[K]) => {
    setDraft({ ...draft, [key]: value });
  };

  const local = useMemo(() => computeShippingEstimate(draft), [draft]);
  const [result, setResult] = useState(local);

  useEffect(() => {
    setResult(local);
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      void fetchLiveFreight(draft, controller.signal).then((live) => {
        if (!live.ok || !live.quote) return;
        if (live.quote.mode !== draft.mode) return;
        setResult(applyLiveQuote(local, live.quote));
      });
    }, 280);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [draft, local]);

  const onDark = tone === 'dark';
  const ink = onDark ? 'text-white' : 'text-[#161616]';
  const muted = onDark ? 'text-white/55' : 'text-black/55';
  const faint = onDark ? 'text-white/40' : 'text-black/40';
  const line = onDark ? 'border-white/15' : 'border-black/15';
  const fieldBorder = onDark ? 'border-white/25 focus:border-white' : 'border-black/25 focus:border-black';

  return (
    <div data-testid="panel-shipping-estimate">
      <div className={compact ? 'grid gap-10' : 'grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start'}>
        <div>
          <p className={`font-monoish text-[10px] ${muted}`}>{s.kicker}</p>
          <h2
            id="shipping-estimate-title"
            className={`mt-6 max-w-xl font-display leading-[.9] tracking-[-.03em] ${ink} ${
              compact ? 'text-4xl sm:text-5xl' : 'text-5xl sm:text-7xl'
            }`}
          >
            {s.titleBefore}
            <em>{s.titleEm}</em>
          </h2>
          <p className={`mt-8 max-w-lg text-sm leading-7 ${muted}`}>{s.body}</p>
        </div>

        <div className="space-y-8">
          <fieldset>
            <legend className={`font-monoish text-[10px] ${muted}`}>{s.modeAria}</legend>
            <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label={s.modeAria}>
              {shippingModes.map((item) => {
                const selected = draft.mode === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setField('mode', item.id)}
                    data-testid={`choice-ship-${item.id}`}
                    className={`border px-3 py-3 text-left transition-colors ${
                      selected
                        ? onDark
                          ? 'border-white bg-white text-[#161616]'
                          : 'border-[#161616] bg-[#161616] text-[#f6f3ec]'
                        : onDark
                          ? 'border-white/20 hover:border-white/45'
                          : 'border-black/18 hover:border-black/45'
                    }`}
                  >
                    <span className="block text-[11px] uppercase tracking-[.16em]">
                      {item.id === 'air' ? s.air : item.id === 'sea' ? s.sea : s.land}
                    </span>
                    <span className={`mt-1 block text-[11px] normal-case tracking-normal ${selected ? 'opacity-65' : muted}`}>
                      {item.id === 'air' ? s.airNote : item.id === 'sea' ? s.seaNote : s.landNote}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="block">
            <span className={`font-monoish text-[9px] ${faint}`}>{s.destination}</span>
            <select
              value={draft.destinationId}
              onChange={(event) => setField('destinationId', event.target.value as ShippingDestinationId)}
              className={`mt-3 w-full border-0 border-b bg-transparent px-0 py-3 text-base outline-none ${fieldBorder}`}
              data-testid="select-ship-destination"
              aria-label={s.destinationAria}
            >
              {shippingDestinations.map((dest) => (
                <option key={dest.id} value={dest.id} className="text-[#161616]">
                  {s.destinations[dest.id].label}
                </option>
              ))}
              <option value="custom" className="text-[#161616]">
                {s.namedPort}
              </option>
            </select>
          </label>

          {draft.destinationId === 'custom' ? (
            <label className="block">
              <span className={`font-monoish text-[9px] ${faint}`}>{s.namedPort}</span>
              <input
                type="text"
                value={draft.customPort}
                onChange={(event) => setField('customPort', event.target.value)}
                placeholder={s.namedPortPlaceholder}
                className={`mt-3 w-full border-0 border-b bg-transparent px-0 py-3 text-base outline-none placeholder:opacity-40 ${fieldBorder}`}
                data-testid="input-ship-custom-port"
              />
            </label>
          ) : null}

          <div>
            <p className={`font-monoish text-[9px] ${faint}`}>{s.cargo}</p>
            {draft.mode === 'air' ? (
              <div className="mt-3 flex flex-col gap-6 sm:flex-row">
                <NumberField
                  label={s.crates}
                  value={draft.crates}
                  min={1}
                  step={1}
                  onChange={(value) => setField('crates', value)}
                  testId="input-ship-crates"
                  className={fieldBorder}
                />
                <NumberField
                  label={s.kgEach}
                  value={draft.kgEach}
                  min={5}
                  step={5}
                  onChange={(value) => setField('kgEach', value)}
                  testId="input-ship-kg"
                  className={fieldBorder}
                />
              </div>
            ) : null}
            {draft.mode === 'sea' ? (
              <div className="mt-3 flex flex-col gap-6 sm:flex-row sm:items-end">
                <div className={`flex border ${line}`} role="group" aria-label={s.boxes}>
                  {(['20ft', '40ft'] as SeaBox[]).map((box) => (
                    <button
                      key={box}
                      type="button"
                      onClick={() => setField('seaBox', box)}
                      data-testid={`toggle-ship-${box}`}
                      className={`px-3 py-2 text-[10px] uppercase tracking-[.16em] ${
                        draft.seaBox === box
                          ? onDark
                            ? 'bg-white text-[#161616]'
                            : 'bg-[#161616] text-[#f6f3ec]'
                          : muted
                      }`}
                    >
                      {box === '20ft' ? s.box20 : s.box40}
                    </button>
                  ))}
                </div>
                <NumberField
                  label={s.containers}
                  value={draft.containers}
                  min={1}
                  step={1}
                  onChange={(value) => setField('containers', value)}
                  testId="input-ship-containers"
                  className={fieldBorder}
                />
              </div>
            ) : null}
            {draft.mode === 'land' ? (
              <div className="mt-3">
                <NumberField
                  label={s.trucks}
                  value={draft.trucks}
                  min={1}
                  step={1}
                  onChange={(value) => setField('trucks', value)}
                  testId="input-ship-trucks"
                  className={fieldBorder}
                />
              </div>
            ) : null}
          </div>

          <div className={`border-t ${line} pt-6`} aria-live="polite">
            <p className={`font-monoish text-[10px] ${muted}`}>
              {result.sourceKind === 'live-api' ? s.liveKicker : s.estimateKicker}
            </p>
            {result.valid ? (
              SHOW_PRICING ? (
                <>
                  <p
                    className={`mt-4 font-display leading-[.95] tracking-[-.03em] ${ink} ${
                      compact ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'
                    }`}
                    data-testid="text-ship-estimate"
                  >
                    {formatUsd(result.lowUsd)}
                    <span className={`mx-2 font-sans text-lg tracking-normal ${faint}`}>–</span>
                    {formatUsd(result.highUsd)}
                  </p>
                  <p className={`mt-3 text-[11px] uppercase tracking-[.14em] ${muted}`} data-testid="text-ship-pkr">
                    {s.pkrApprox(formatPkr(result.lowPkr), formatPkr(result.highPkr), result.usdRate)}
                  </p>
                </>
              ) : null
            ) : (
              <p className={`mt-4 font-display text-3xl ${muted}`} data-testid="text-ship-waiting">
                {s.namedPort}
              </p>
            )}
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className={`text-[10px] uppercase tracking-[.16em] ${faint}`}>{s.source}</dt>
                <dd className={ink} data-testid="text-ship-source">
                  {result.vendorName ?? result.sourceName}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className={`text-[10px] uppercase tracking-[.16em] ${faint}`}>{s.currency}</dt>
                <dd className={ink}>USD</dd>
              </div>
            </dl>
            {result.valid ? (
              <p className={`mt-5 text-sm leading-6 ${muted}`} data-testid="text-ship-assumed">
                {result.assumed}. {result.transit}.
              </p>
            ) : null}
            {result.landNote === 'split' ? (
              <p className={`mt-3 text-sm leading-6 ${muted}`}>{s.landSplit}</p>
            ) : null}
            {result.landNote === 'through' ? (
              <p className={`mt-3 text-sm leading-6 ${muted}`}>{s.landDirect}</p>
            ) : null}
            <p className={`mt-5 text-[11px] leading-5 ${faint}`} data-testid="text-ship-disclaimer">
              {s.notQuote} {s.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  step,
  onChange,
  testId,
  className,
}: {
  label: string;
  value: number;
  min: number;
  step: number;
  onChange: (value: number) => void;
  testId: string;
  className: string;
}) {
  return (
    <label className="block min-w-0 flex-1">
      <span className="font-monoish text-[9px] opacity-45">{label}</span>
      <input
        type="number"
        min={min}
        step={step}
        value={Number.isFinite(value) ? value : ''}
        onChange={(event) => {
          const numeric = Number(event.target.value);
          if (Number.isFinite(numeric) && numeric > 0) onChange(numeric);
        }}
        className={`mt-3 w-full border-0 border-b bg-transparent px-0 py-3 text-base outline-none ${className}`}
        data-testid={testId}
      />
    </label>
  );
}

export function shippingModeLabel(mode: ShippingMode, air: string, sea: string, land: string) {
  if (mode === 'air') return air;
  if (mode === 'sea') return sea;
  return land;
}
