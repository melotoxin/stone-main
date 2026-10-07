import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { pieceHref, type Piece } from '@/data/gallery';
import { localizedPiece, useI18n } from '@/i18n';

export function WorkGrid({
  works,
  tone = 'ink',
  enquireLabel,
}: {
  works: Piece[];
  tone?: 'ink' | 'paper';
  enquireLabel?: string;
}) {
  const { locale, t } = useI18n();
  const dark = tone === 'ink';

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {works.map((piece) => {
        const local = localizedPiece(piece, locale);
        return (
          <article key={piece.slug} className="group" data-testid={`card-work-${piece.slug}`}>
            <Link href={pieceHref(piece)} className="block">
              <div className={`aspect-[4/5] overflow-hidden ${dark ? 'bg-[#333333]' : 'bg-[#e7e3da]'}`}>
                <img
                  src={piece.images[0]}
                  alt={t.seo.pieceAlt(local.title, local.material)}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-5 font-display text-3xl leading-none">{local.title}</p>
              <p className={`mt-2 text-[10px] uppercase tracking-[.14em] ${dark ? 'text-white/50' : 'text-[#0c0c0c]/50'}`}>
                {local.material}
              </p>
            </Link>
            <Link
              href={`/enquire?work=${encodeURIComponent(piece.slug)}`}
              className={`mt-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] ${dark ? 'text-white/70' : 'text-[#0c0c0c]/65'}`}
              data-testid={`link-work-enquire-${piece.slug}`}
            >
              {enquireLabel ?? t.retailStore.pieceEnquire} <ArrowUpRight size={13} strokeWidth={1.5} />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
