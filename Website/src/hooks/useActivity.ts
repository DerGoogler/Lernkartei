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
export const Settings = React.createContext(SettingsElements);

export function useActivity<E = {}>() {
  const ctx = React.useContext(Context) as PushProps<E>;
  const sts = React.useContext(Settings);
  return {
    context: ctx.context,
    settings: sts,
    extra: ctx.extra,
  };
}
