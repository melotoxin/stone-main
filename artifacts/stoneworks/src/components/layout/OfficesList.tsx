import { offices } from '@/data/offices';
import { useI18n } from '@/i18n';

type OfficesVariant = 'footer' | 'page' | 'home';

export function OfficesList({ variant }: { variant: OfficesVariant }) {
  const { t } = useI18n();
  const headingId = `offices-heading-${variant}`;
  const compact = variant === 'footer';

  return (
    <section aria-labelledby={headingId} data-testid={`section-offices-${variant}`}>
      <p id={headingId} className="font-monoish text-[10px] uppercase tracking-[.16em] text-[#f6f3ec]/50">
        {t.offices.heading} / {t.offices.headingLong}
      </p>
      {variant !== 'footer' ? (
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#f6f3ec]/65">{t.offices.intro}</p>
      ) : null}
      <ul
        className={
          compact
            ? 'mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-5'
            : variant === 'home'
              ? 'mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5'
              : 'mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5'
        }
      >
        {offices.map((office) => {
          const place = t.offices.places[office.id];
          const showAddress = Boolean(place.address) && place.address !== place.city;
          return (
            <li key={office.id} data-testid={`office-${variant}-${office.id}`}>
              <p
                className={
                  compact
                    ? 'text-[10px] uppercase tracking-[.14em] text-[#f6f3ec]'
                    : 'font-display text-2xl leading-tight text-[#f6f3ec]'
                }
              >
                {place.city}
              </p>
              {office.role === 'studio' ? (
                <p className="mt-1 text-[10px] uppercase tracking-[.14em] text-[#f6f3ec]/50">{t.offices.studioLabel}</p>
              ) : null}
              {showAddress ? <p className="mt-2 text-sm leading-5 text-[#f6f3ec]/65">{place.address}</p> : null}
              <p className="mt-1 text-[10px] uppercase tracking-[.14em] text-[#f6f3ec]/50">{place.country}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
