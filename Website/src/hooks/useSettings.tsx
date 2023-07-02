import React, { createContext, Dispatch, SetStateAction, useContext, useEffect } from "react";
import { colors as kolors, Theme, useTheme as useMom, createTheme, ThemeProvider } from "@mui/material";
import shadeColor from "../util/shadeColor";
import { os } from "../native/Os";
import { SetValue, useNativeStorage } from "./useNativeStorage";
import { UI } from "@Native/components/UI";
import { defaultComposer } from "default-composer";
import { Languages, languages_map } from "./../locales/languages";

export namespace Settings {
  export interface Context {
    settings: Root;
    setSettings: (state: Partial<Settings.Root>) => void;
  }

  export type AccentScheme = {
    name: string;
    value: any;
  };

  export interface Root {
    darkmode: boolean;
    language: Languages;
    accent_scheme: AccentScheme;
    intro_finised: boolean;
    eruda_console_enabled: boolean;
    __ace_settings_enabled: boolean;
    __ace_settings_show_gutter: boolean;
    __ace_settings_highlight_active_line: boolean;
    __ace_settings_show_line_numbers: boolean;
  }
}

export const accent_colors: Settings.AccentScheme[] = [
  {
    name: "Purple",
    value: "purple",
  },
  {
    name: "Amber",
    value: "amber",
  },
  {
    name: "Blue",
    value: "blue",
  },
  {
    name: "Blue & Grey",
    value: "blueGrey",
  },
  {
    name: "Cyan",
    value: "cyan",
  },
  {
    name: "Deep Orange",
    value: "deepOrange",
  },

  {
    name: "Deep Purple",
    value: "deepPurple",
  },
  {
    name: "Green",
    value: "green",
  },
  {
    name: "Indigo",
    value: "indigo",
  },
  {
    name: "Light Blue",
    value: "lightBlue",
  },

  {
    name: "Light Green",
    value: "lightGreen",
  },
  {
    name: "Lime",
    value: "lime",
  },
  {
    name: "Orange",
    value: "orange",
  },
  {
    name: "Pink",
    value: "pink",
  },

  {
    name: "Red",
    value: "red",
  },
  {
    name: "Teal",
    value: "teal",
  },
  {
    name: "Yellow",
    value: "yellow",
  },
];

export const INITIAL_SETTINGS: Settings.Root = {
  darkmode: false,
  language: languages_map[0],
  accent_scheme: accent_colors[0],
  intro_finised: false,
  eruda_console_enabled: false,
  __ace_settings_enabled: false,
  __ace_settings_show_gutter: true,
  __ace_settings_highlight_active_line: true,
  __ace_settings_show_line_numbers: true,
};

export const colors = {
  amber: kolors.amber,
  blue: kolors.blue,
  blueGrey: kolors.blueGrey,
  brown: kolors.brown,
  cyan: kolors.cyan,
  deepOrange: kolors.deepOrange,
  deepPurple: kolors.deepPurple,
  green: kolors.green,
  grey: kolors.grey,
  indigo: kolors.indigo,
  lightBlue: kolors.lightBlue,
  lightGreen: kolors.lightGreen,
  lime: kolors.lime,
  orange: kolors.orange,
  pink: kolors.pink,
  purple: kolors.purple,
  red: kolors.red,
  teal: kolors.teal,
  yellow: kolors.yellow,
};

export const SettingsContext = createContext<Settings.Context>({
  settings: INITIAL_SETTINGS,
  setSettings: (state: Partial<Settings.Root>) => {},
});

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const useTheme = () => {
  const theme = useMom();
  const { settings } = useSettings();

  return {
    scheme: colors[settings.accent_scheme.value],
    theme: theme,
    shadeColor,
  };
};

export const SettingsProvider = (props: React.PropsWithChildren) => {
  const [settings, setSettings] = useNativeStorage<Settings.Root>("settings", INITIAL_SETTINGS);

  const theme = createTheme({
    shape: {
      borderRadius: 8,
    },
    palette: !settings.darkmode
      ? {
          mode: "light",
          primary: {
            light: colors[settings.accent_scheme.value][300],
            main: colors[settings.accent_scheme.value][900],
            // @ts-ignore
            dark: colors[settings.accent_scheme.value][800],
            // contrastText: colors.grey[900],
          },
          background: {
            default: "#fafafa",
          },
          divider: "#e5e8ec",
          secondary: {
            main: "#e5e8ec",
            light: "#eeeeee",
          },
        }
      : {
          mode: "dark",
          primary: {
            light: shadeColor(colors[settings.accent_scheme.value][300], -10),
            main: shadeColor(colors[settings.accent_scheme.value][900], -40),
            // dark: colors[scheme.value][800],
          },
          background: {
            default: shadeColor(colors[settings.accent_scheme.value][900], -75),
          },
          divider: shadeColor(colors[settings.accent_scheme.value][900], -85),
          secondary: {
            main: "#e5e8ec",
            light: shadeColor(colors[settings.accent_scheme.value][900], -80),
            dark: shadeColor(colors[settings.accent_scheme.value][800], -60),
          },
        },
  });

  return (
    <ThemeProvider theme={theme}>
      <UI.Statusbar color={theme.palette.primary.main} white={false}>
        <UI.Navigationbar color={theme.palette.background.default}>
          <SettingsContext.Provider
            value={{
              settings: defaultComposer(INITIAL_SETTINGS, settings),
              setSettings: (state: Partial<Settings.Root>) => {
                setSettings((prev) => ({
                  ...prev,
                  ...state,
                }));
              },
            }}
            children={props.children}
          />
        </UI.Navigationbar>
      </UI.Statusbar>
    </ThemeProvider>
  );
};
