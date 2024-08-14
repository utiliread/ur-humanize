import { Locale } from "./locale";
export declare function getLocale(locale: string): Locale;
export declare function loadLocale(locale?: string | Locale): Promise<Locale>;
