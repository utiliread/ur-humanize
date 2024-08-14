"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocale = getLocale;
exports.loadLocale = loadLocale;
const luxon_1 = require("luxon");
const en_1 = require("./locale/en");
const cache = {};
function getLocale(locale) {
    const localeId = makeLocaleId(locale);
    return cache[localeId] || en_1.default;
}
function loadLocale(locale) {
    if (!locale) {
        locale = luxon_1.DateTime.local().locale;
    }
    if (typeof locale === "string") {
        const localeId = makeLocaleId(locale || luxon_1.DateTime.local().locale);
        return Promise.resolve(`${
        /* webpackChunkName: "lang-[request]" */ `./locale/${localeId}`}`).then(s => require(s)).catch((error) => {
            console.error(`Unable to find locale ${localeId} - using default locale`, error);
            return en_1.default;
        })
            .then((loaded) => {
            const loadedLocale = "default" in loaded ? loaded.default : loaded;
            // Inject the loaded locale into the cache
            cache[localeId] = loadedLocale;
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