import { DateTime } from "luxon";
import { Locale } from "./locale";
import { default as defaultHumanizeLocale } from "./locale/en";

const cache: { [localeId: string]: Locale } = {};

export function getLocale(locale: string) {
  const localeId = makeLocaleId(locale);
  return cache[localeId] || defaultHumanizeLocale;
}

export function loadLocale(locale?: string | Locale) {
  if (!locale) {
    locale = DateTime.local().locale;
  }

  if (typeof locale === "string") {
    const localeId = makeLocaleId(locale || DateTime.local().locale);

    return import(
      /* webpackChunkName: "lang-[request]" */ `./locale/${localeId}`
    )
      .catch((error) => {
        console.error(
          `Unable to find locale ${localeId} - using default locale`,
          error,
        );

        return defaultHumanizeLocale;
      })
      .then((loaded) => {
        const loadedLocale: Locale =
          "default" in loaded ? loaded.default : loaded;

        // Inject the loaded locale into the cache
        cache[localeId] = loadedLocale;

        return loadedLocale;
      });
  } else if (locale) {
    cache[locale.id] = locale;
    return Promise.resolve(locale);
  } else {
    throw new Error("Unable to load locale");
  }
}

function makeLocaleId(locale: string) {
  return locale.substring(0, 2);
}
