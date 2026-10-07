import { useI18n } from '@/i18n';

export function WorkTombstone({
  maker,
  studioCity,
  stoneLabel,
  finishLabel,
  evidenceLabel,
  reviewed,
  cite,
}: {
  maker: string;
  studioCity: string;
  stoneLabel: string;
  finishLabel: string;
  evidenceLabel: string;
  reviewed: string;
  cite: string;
}) {
  const { t } = useI18n();

  return (
    <div className="mt-10 border-t border-white/12 pt-8" data-testid="work-tombstone">
      <p className="font-monoish text-[9px] text-[#f6f3ec]/40">{t.collection.citeWork}</p>
      <dl className="mt-5 space-y-4 text-sm">
        <div>
          <dt className="text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/40">{t.collection.maker}</dt>
          <dd className="mt-2 text-[#f6f3ec]/80">{maker}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/40">{t.collection.studio}</dt>
          <dd className="mt-2 text-[#f6f3ec]/80">{studioCity}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/40">{t.collection.stoneFamily}</dt>
          <dd className="mt-2 text-[#f6f3ec]/80">{stoneLabel}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/40">{t.collection.finish}</dt>
          <dd className="mt-2 text-[#f6f3ec]/80">{finishLabel}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/40">{t.collection.evidence}</dt>
          <dd className="mt-2 text-[#f6f3ec]/80">{evidenceLabel}</dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/40">{t.collection.reviewed}</dt>
          <dd className="mt-2 text-[#f6f3ec]/80">{reviewed}</dd>
        </div>
      </dl>
      <blockquote className="mt-6 max-w-sm text-sm leading-7 text-[#f6f3ec]/62">{cite}</blockquote>
    </div>
  );
}
