import { DateTime, Settings } from 'luxon';

import { HumanizeLocale } from './humanize-locale';
import { default as defaultHumanizeLocale } from './en';

export { HumanizeLocale } from './humanize-locale';

let loadedLocales: {[localeId: string]: HumanizeLocale} = {};

export function getLocale(date: DateTime) {
    let localeId = makeLocaleId(date.locale);
    return loadedLocales[localeId] || defaultHumanizeLocale;
}

export function loadLocale(locale?: string) {
    const localeId = makeLocaleId(locale || DateTime.local().locale);

    return import('./' + localeId)
        .catch(() => defaultHumanizeLocale)
        .then(humanizeLocale => {
            loadedLocales[localeId] = 'default' in humanizeLocale ? humanizeLocale.default : humanizeLocale;
        });
}

function makeLocaleId(locale: string) {
    return locale.substr(0, 2);
}