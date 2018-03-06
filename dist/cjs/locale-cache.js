"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var luxon_1 = require("luxon");
var en_1 = require("./locale/en");
var cache = {};
function getLocale(locale) {
    var localeId = makeLocaleId(locale);
    return cache[localeId] || en_1.default;
}
exports.getLocale = getLocale;
function loadLocale(locale) {
    var localeId = makeLocaleId(locale || luxon_1.DateTime.local().locale);
    return Promise.resolve().then(function () { return require(/* webpackChunkName: "lang-[request]" */ "./locale/" + localeId); }).catch(function () {
        console.log("Unable to find locale " + localeId + " - using default locale.");
        return en_1.default;
    })
        .then(function (loaded) {
        var loadedLocale = 'default' in loaded ? loaded.default : loaded;
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