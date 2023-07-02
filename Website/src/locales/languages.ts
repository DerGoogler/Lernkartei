import LocalizedStrings from "localized-strings";
import { DE_Locale } from "./de";
import { EN_Locale } from "./en";

export const languages = new LocalizedStrings(
  {
    de: DE_Locale,
    en: EN_Locale,
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
    name: "German",
    value: "de",
  },
  {
    name: "English",
    value: "en",
  },
];
