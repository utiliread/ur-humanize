"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLocale = exports.getLocale = void 0;
var luxon_1 = require("luxon");
var en_1 = require("./locale/en");
var cache = {};
function getLocale(locale) {
    var localeId = makeLocaleId(locale);
    return cache[localeId] || en_1.default;
}
exports.getLocale = getLocale;
function loadLocale(locale) {
    if (!locale) {
        locale = luxon_1.DateTime.local().locale;
    }
    if (typeof locale === "string") {
        var localeId_1 = makeLocaleId(locale || luxon_1.DateTime.local().locale);
        return Promise.resolve().then(function () { return require(/* webpackChunkName: "lang-[request]" */ "./locale/".concat(localeId_1)); }).catch(function (error) {
            console.error("Unable to find locale ".concat(localeId_1, " - using default locale"), error);
            return en_1.default;
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
exports.loadLocale = loadLocale;
function makeLocaleId(locale) {
    return locale.substring(0, 2);
}
//# sourceMappingURL=locale-cache.js.map