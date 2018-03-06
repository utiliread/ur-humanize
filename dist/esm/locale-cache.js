import { DateTime } from 'luxon';
import { default as defaultHumanizeLocale } from './locale/en';
var cache = {};
export function getLocale(locale) {
    var localeId = makeLocaleId(locale);
    return cache[localeId] || defaultHumanizeLocale;
}
export function loadLocale(locale) {
    var localeId = makeLocaleId(locale || DateTime.local().locale);
    return import(/* webpackChunkName: "lang-[request]" */ "./locale/" + localeId)
        .catch(function () {
        console.log("Unable to find locale " + localeId + " - using default locale.");
        return defaultHumanizeLocale;
    })
        .then(function (loaded) {
        var loadedLocale = 'default' in loaded ? loaded.default : loaded;
        // Inject the loaded lcoale into the cache
        cache[localeId] = loadedLocale;
        return loadedLocale;
    });
}
function makeLocaleId(locale) {
    return locale.substr(0, 2);
}
//# sourceMappingURL=locale-cache.js.map