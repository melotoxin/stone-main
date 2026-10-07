import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Search, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { pieces, rooms } from "@/data/gallery";
import { localizedPiece, localizedRooms, useI18n } from "@/i18n";

export function CollectionSearch() {
  const { locale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase(locale);
    if (!term) return [];
    return pieces
      .filter((piece) => {
        const local = localizedPiece(piece, locale);
        return `${local.title} ${local.material} ${piece.title} ${piece.material} ${piece.code}`
          .toLocaleLowerCase(locale)
          .includes(term);
      })
      .slice(0, 12);
  }, [locale, query]);

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) setQuery("");
      }}
    >
      <DialogTrigger asChild>
        <button
          className="luxury-search-trigger"
          type="button"
          aria-label={t.luxuryHome.search}
          data-testid="button-collection-search"
        >
          <Search size={22} strokeWidth={1.4} />
        </button>
      </DialogTrigger>
      <DialogContent className="collection-search">
        <DialogTitle className="font-display text-3xl">
          {t.luxuryHome.search}
        </DialogTitle>
        <DialogDescription>{t.luxuryHome.searchHint}</DialogDescription>
        <input
          className="collection-search__input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label={t.luxuryHome.search}
          placeholder={t.luxuryHome.searchHint}
          data-testid="input-collection-search"
        />
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {query.trim()
            ? results.length
              ? t.home.works(String(results.length))
              : t.luxuryHome.noResults
            : ""}
        </div>
        {query.trim() ? (
          <div className="collection-search__results">
            {results.length ? (
              results.map((piece) => {
                const local = localizedPiece(piece, locale);
                return (
                  <Link
                    key={piece.slug}
                    href={`/collection/${piece.room}/${piece.slug}`}
                    className="collection-search__result"
                    onClick={() => setOpen(false)}
                  >
                    <img
                      src={piece.images[0]}
                      alt=""
                      width={64}
                      height={64}
                      loading="lazy"
                    />
                    <span>
                      <strong>{local.title}</strong>
                      <small>{local.material}</small>
                    </span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                );
              })
            ) : (
              <p className="py-6 text-sm text-white/65">
                {t.luxuryHome.noResults}
              </p>
            )}
          </div>
        ) : (
          <div className="collection-search__rooms">
            {localizedRooms(rooms, locale).map((room) => (
              <Link
                key={room.slug}
                href={`/collection/${room.slug}`}
                onClick={() => setOpen(false)}
              >
                {room.title}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
