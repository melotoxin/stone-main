import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Link, useLocation } from "wouter";
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
  const [, navigate] = useLocation();
  const resultsRef = useRef<HTMLDivElement>(null);
  const results = useMemo(() => {
    // Every word must appear somewhere, so "travertine table" finds
    // "Travertine Walnut Coffee Table" as well as exact phrases.
    const terms = query.trim().toLocaleLowerCase(locale).split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return pieces
      .filter((piece) => {
        const local = localizedPiece(piece, locale);
        const haystack = `${local.title} ${local.material} ${piece.title} ${piece.material} ${piece.code} ${piece.room}`
          .toLocaleLowerCase(locale);
        return terms.every((term) => haystack.includes(term));
      })
      .slice(0, 12);
  }, [locale, query]);

  const resultLinks = () =>
    Array.from(resultsRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && results[0]) {
      event.preventDefault();
      setOpen(false);
      setQuery("");
      navigate(`/collection/${results[0].room}/${results[0].slug}`);
    } else if (event.key === "ArrowDown") {
      const first = resultLinks()[0];
      if (first) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const onResultsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const links = resultLinks();
    const index = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (index === -1) return;
    event.preventDefault();
    if (event.key === "ArrowUp" && index === 0) {
      event.currentTarget.closest("[role=dialog]")?.querySelector<HTMLInputElement>("input")?.focus();
      return;
    }
    links[Math.min(links.length - 1, Math.max(0, index + (event.key === "ArrowDown" ? 1 : -1)))]?.focus();
  };

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
          onKeyDown={onInputKeyDown}
          enterKeyHint="search"
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
          <div className="collection-search__results" ref={resultsRef} onKeyDown={onResultsKeyDown}>
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
