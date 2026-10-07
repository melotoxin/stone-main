import { ar } from './ar';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { it } from './it';
import { ru } from './ru';
import { ur } from './ur';
import type { LocaleCode } from '../locales';
import type { Catalog } from '../types';

export const catalogs: Record<LocaleCode, Catalog> = { en, es, it, fr, ar, ur, ru };
