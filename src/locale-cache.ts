import { DateTime } from 'luxon';
import { Locale } from './locale/locale';
import { default as defaultHumanizeLocale } from './locale/en';

const cache: {[localeId: string]: Locale} = {};

export function getLocale(date: DateTime) {
    let localeId = makeLocaleId(date.locale);
    return cache[localeId] || defaultHumanizeLocale;
}

export function loadLocale(locale?: string) {
    const localeId = makeLocaleId(locale || DateTime.local().locale);

    return import('./locale/' + localeId)
        .catch(() => defaultHumanizeLocale)
        .then(loaded => {
            let loadedLocale: Locale = 'default' in loaded ? loaded.default : loaded;
            
            // Inject the loaded lcoale into the cache
            cache[localeId] = loadedLocale;

            return loadedLocale;
        });
}

function makeLocaleId(locale: string) {
    return locale.substr(0, 2);
}