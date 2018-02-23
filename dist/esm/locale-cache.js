import { DateTime } from 'luxon';
import { default as defaultHumanizeLocale } from './locale/en';
const cache = {};
export function getLocale(locale) {
    let localeId = makeLocaleId(locale);
    return cache[localeId] || defaultHumanizeLocale;
}
export function loadLocale(locale) {
    const localeId = makeLocaleId(locale || DateTime.local().locale);
    return import(/* webpackChunkName: "lang-[request]" */ `./locale/${localeId}`)
        .catch(() => {
        console.log(`Unable to find locale ${localeId} - using default locale.`);
        return defaultHumanizeLocale;
    })
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
//# sourceMappingURL=locale-cache.js.map