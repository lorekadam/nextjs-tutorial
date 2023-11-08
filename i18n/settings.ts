import type { InitOptions } from "i18next";

export const cookieName = "i18next";
export const fallbackLng = "en";
export const locales = [fallbackLng, "pl"] as const;
export type LocaleTypes = (typeof locales)[number];
export const defaultNS = "home";

export function getOptions(lang = fallbackLng, ns = defaultNS): InitOptions {
  return {
    supportedLngs: locales,
    fallbackLng,
    lng: lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
