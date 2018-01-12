import { DateTime } from 'luxon';
import { default as defaultHumanizeLocale } from './en';
let loadedLocales = {};
export function getLocale(date) {
    let localeId = makeLocaleId(date.locale);
    return loadedLocales[localeId] || defaultHumanizeLocale;
}
export function loadLocale(locale) {
    const localeId = makeLocaleId(locale || DateTime.local().locale);
    return import('./' + localeId)
        .catch(() => defaultHumanizeLocale)
        .then(humanizeLocale => {
        loadedLocales[localeId] = 'default' in humanizeLocale ? humanizeLocale.default : humanizeLocale;
    });
}
function makeLocaleId(locale) {
    return locale.substr(0, 2);
}
