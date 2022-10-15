import React, { SetStateAction } from "react";
import LocalizedStrings from "localized-strings";
import { DE_Locale } from "../locales/de";
import { useNativeStorage } from "./useNativeStorage";
import { EN_Locale } from "../locales/en";

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
  language: "",
  setLanguage: (state: SetStateAction<string>) => {},
});

export type StringProviderProps = {
  children: React.ReactNode;
};

export const StringProvider = (props: StringProviderProps) => {
  const [language, setLanguage] = useNativeStorage("language", "de");

  std.setLanguage(language);
  return (
    <Strings.Provider
      value={{
        strings: std,
        language: language,
        setLanguage: setLanguage,
      }}
    >
      {props.children}
    </Strings.Provider>
  );
};

export const useStrings = () => {
  return React.useContext(Strings);
};
