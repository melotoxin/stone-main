import { en } from "./en";
import type { Catalog } from "../types";

export type PartialCatalog<T = Catalog> = T extends (...args: never[]) => unknown
  ? T
  : T extends readonly unknown[]
    ? T
    : T extends object
      ? { [Key in keyof T]?: PartialCatalog<T[Key]> }
      : T;

const merge = (base: unknown, local: unknown): unknown => {
  if (local === undefined) return base;
  if (
    base &&
    local &&
    typeof base === "object" &&
    typeof local === "object" &&
    !Array.isArray(base) &&
    !Array.isArray(local)
  ) {
    const result = { ...base } as Record<string, unknown>;
    for (const [key, value] of Object.entries(local))
      result[key] = merge(result[key], value);
    return result;
  }
  return local;
};

/**
 * Older translations retain their copy and inherit newly added missing fields.
 * `fill` (see ./fills) supplies translations for fields the main catalogue
 * never covered; the main catalogue still wins wherever it has a value, and
 * English is the last resort.
 */
export function withCatalogFallback<T extends PartialCatalog<Catalog>>(
  translation: T,
  fill: PartialCatalog<Catalog> = {},
): Catalog {
  return merge(merge(en, fill), translation) as Catalog;
}
