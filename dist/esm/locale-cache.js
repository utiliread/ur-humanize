import { DateTime } from 'luxon';
import { default as defaultHumanizeLocale } from './locale/en';
var cache = {};
export function getLocale(locale) {
    var localeId = makeLocaleId(locale);
    return cache[localeId] || defaultHumanizeLocale;
}
export function loadLocale(locale) {
    if (!locale) {
        locale = DateTime.local().locale;
    }
    if (typeof locale === "string") {
        var localeId_1 = makeLocaleId(locale || DateTime.local().locale);
        return import(/* webpackChunkName: "lang-[request]" */ "./locale/".concat(localeId_1))
            .catch(function (error) {
            console.error("Unable to find locale ".concat(localeId_1, " - using default locale"), error);
            return defaultHumanizeLocale;
        })
            .then(function (loaded) {
            var loadedLocale = 'default' in loaded ? loaded.default : loaded;
            // Inject the loaded locale into the cache
            cache[localeId_1] = loadedLocale;
            return loadedLocale;
        });
    }
    else if (locale) {
        cache[locale.id] = locale;
        return Promise.resolve(locale);
    }
    else {
        throw new Error("Unable to load locale");
    }
}
function makeLocaleId(locale) {
    return locale.substring(0, 2);
}
//# sourceMappingURL=locale-cache.js.map