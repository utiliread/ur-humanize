"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const en_1 = require("./locale/en");
const cache = {};
function getLocale(locale) {
    let localeId = makeLocaleId(locale);
    return cache[localeId] || en_1.default;
}
exports.getLocale = getLocale;
function loadLocale(locale) {
    const localeId = makeLocaleId(locale || luxon_1.DateTime.local().locale);
    return Promise.resolve().then(() => require(/* webpackChunkName: "lang-[request]" */ `./locale/${localeId}`)).catch(() => {
        console.log(`Unable to find locale ${localeId} - using default locale.`);
        return en_1.default;
    })
        .then(loaded => {
        let loadedLocale = 'default' in loaded ? loaded.default : loaded;
        // Inject the loaded lcoale into the cache
        cache[localeId] = loadedLocale;
        return loadedLocale;
    });
}
exports.loadLocale = loadLocale;
function makeLocaleId(locale) {
    return locale.substr(0, 2);
}
//# sourceMappingURL=locale-cache.js.map