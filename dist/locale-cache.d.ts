/// <reference types="luxon" />
import { DateTime } from 'luxon';
import { Locale } from './locale/locale';
export declare function getLocale(date: DateTime): Locale;
export declare function loadLocale(locale?: string): Promise<Locale>;
