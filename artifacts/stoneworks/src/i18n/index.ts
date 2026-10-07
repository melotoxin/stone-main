import type { Piece, Room } from '@/data/gallery';
import { catalogs } from './catalogs';
import { ALL_LOCALES, type LocaleCode } from './locales';
import { prefixLocale } from './paths';
import type { Catalog } from './types';

export { catalogs } from './catalogs';
export { I18nProvider } from './I18nProvider';
export { useI18n } from './use-i18n';
export { Link } from './link';
export { LanguageSwitcher } from './LanguageSwitcher';
export { LocaleHint } from './LocaleHint';
export { ALL_LOCALES, CONTENT_LOCALES, LOCALES, isLocaleCode, suggestLocaleFromBrowser } from './locales';
export type { LocaleCode } from './locales';
export { localeFromPath, localizeHref, prefixLocale, stripLocalePath, switchLocaleHref, LOCALE_ROUTE } from './paths';
export type { Catalog, PieceCopy, RoomCopy } from './types';

export function getCatalog(locale: LocaleCode): Catalog {
  return catalogs[locale];
}

export function localizedRoom(room: Room, locale: LocaleCode): Room {
  const copy = catalogs[locale].rooms[room.slug];
  return copy ? { ...room, title: copy.title, kicker: copy.kicker, wallText: copy.wallText } : room;
}

export function localizedPiece(piece: Piece, locale: LocaleCode): Piece {
  const copy = catalogs[locale].pieces[piece.slug];
  return copy
    ? { ...piece, title: copy.title, material: copy.material, form: copy.form, note: copy.note }
    : piece;
}

export function localizedRooms(rooms: Room[], locale: LocaleCode) {
  return rooms.map((room) => localizedRoom(room, locale));
}

export function localizedPieces(pieces: Piece[], locale: LocaleCode) {
  return pieces.map((piece) => localizedPiece(piece, locale));
}

export function localePath(path: string, locale: LocaleCode) {
  return prefixLocale(path, locale);
}

export const LOCALE_CODES = ALL_LOCALES;

export function localizedLead(
  draft: { finish: string; stone: string; commission: string },
  locale: LocaleCode,
): string {
  const leads = catalogs[locale].estimate.leads;
  if (draft.finish === 'backlit' || draft.stone === 'onyx') return leads.onyx;
  if (draft.commission === 'slab') return leads.slab;
  if (draft.commission === 'object' || draft.commission === 'sink') return leads.object;
  if (draft.commission === 'counter') return leads.counter;
  return leads.table;
}
