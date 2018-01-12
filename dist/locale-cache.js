import { DateTime } from 'luxon';
import { default as defaultHumanizeLocale } from './locale/en';
const cache = {};
export function getLocale(date) {
    let localeId = makeLocaleId(date.locale);
    return cache[localeId] || defaultHumanizeLocale;
}
export function loadLocale(locale) {
    const localeId = makeLocaleId(locale || DateTime.local().locale);
    return import('./locale/' + localeId)
        .catch(() => defaultHumanizeLocale)
        .then(loaded => {
        let loadedLocale = 'default' in loaded ? loaded.default : loaded;
        // Inject the loaded lcoale into the cache
        cache[localeId] = loadedLocale;
        return loadedLocale;
    });
}
function makeLocaleId(locale) {
    return locale.substr(0, 2);
}
