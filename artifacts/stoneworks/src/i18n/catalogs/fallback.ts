import { en } from "./en";
import type { Catalog } from "../types";

type PartialCatalog<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends readonly unknown[]
    ? T
    : T extends object
      ? { [Key in keyof T]?: PartialCatalog<T[Key]> }
      : T;

/** Older translations retain their copy and inherit newly added missing fields. */
export function withCatalogFallback<T extends PartialCatalog<Catalog>>(
  translation: T,
): Catalog {
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
  return merge(en, translation) as Catalog;
}
