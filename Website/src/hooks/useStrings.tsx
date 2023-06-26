import React, { SetStateAction } from "react";
import LocalizedStrings from "localized-strings";
import { DE_Locale } from "../locales/de";
import { useNativeStorage } from "./useNativeStorage";
import { EN_Locale } from "../locales/en";
import { useSettings } from "./useSettings";

const std = new LocalizedStrings(
  {
    de: DE_Locale,
    en: EN_Locale,
  },
  {
    /* options */
  }
);

const Strings = React.createContext({
  strings: std,
  language: "de",
});

export type StringProviderProps = {
  children: React.ReactNode;
};

export const StringProvider = (props: StringProviderProps) => {
  const { settings } = useSettings();

  std.setLanguage(settings.language);
  return (
    <Strings.Provider
      value={{
        strings: std,
        language: settings.language,
      }}
      children={props.children}
    />
  );
};

export const useStrings = () => {
  return React.useContext(Strings);
};
