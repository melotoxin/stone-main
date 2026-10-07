import { createContext } from 'react';
import type { LocaleCode } from './locales';
import type { Catalog } from './types';

export type I18nValue = {
  locale: LocaleCode;
  dir: 'ltr' | 'rtl';
  t: Catalog;
  href: (path: string) => string;
  barePath: string;
  prefix: (path: string) => string;
};

/** Stable identity: keep this file free of catalog imports so HMR cannot remint the context. */
export const I18nContext = createContext<I18nValue | null>(null);
