import LocalizedStrings from "localized-strings";
import { DE_Locale } from "./de";
import { EN_Locale } from "./en";

export const languages = new LocalizedStrings(
  {
    en: EN_Locale,
    de: DE_Locale,
  },
  {
    /* options */
  }
);

export type Languages = {
  name: string;
  value: string;
};

export const languages_map: Languages[] = [
  {
    name: "English",
    value: "en",
  },
  {
    name: "German",
    value: "de",
  },
];
