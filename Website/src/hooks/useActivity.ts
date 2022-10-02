import React from "react";
import { useNativeStorage } from "../native/SharedPreferences";
import { AccentColors, accent_colors } from "../theme";

export const SettingsElements = {
  useDarkmode: () => {
    return useNativeStorage.boolean("darkmode", false);
  },
  useKartei: () => {
    return useNativeStorage.json<Kartei[]>("katei", []);
  },
  useScheme: () => {
    return useNativeStorage.json<AccentColors[0]>("accent_scheme", accent_colors[0]);
  },
};

export const Context = React.createContext({});
export const Extra = React.createContext({});

export function useActivity<E = {}>() {
  const ctx = React.useContext(Context) as PushProps<E>;
  const etx = React.useContext(Extra) as E;
  return {
    context: ctx,
    extra: etx,
  };
}
