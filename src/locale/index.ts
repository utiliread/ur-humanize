import { DateTime } from 'luxon';
import { HumanizeLocale } from './humanize-locale';
import { default as defaultLocale } from './en';

export { default as da } from './da';
export { default as en } from './en';
export { HumanizeLocale } from './humanize-locale';

let cache: {[twoLetterCode: string]: HumanizeLocale} = {};

export function getLocale(date: DateTime) {
    let twoLetterCode = date.locale.substr(0, 2);
    
    if (twoLetterCode in cache) {
        return cache[twoLetterCode];
    }

    let locale: HumanizeLocale;
 
    try {
        locale = require('./' + twoLetterCode).default;
    }
    catch (error) {
        locale = defaultLocale;
    }

    cache[twoLetterCode] = locale;

    return locale;
}