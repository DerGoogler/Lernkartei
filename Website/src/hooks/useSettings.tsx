import React, { createContext, useContext } from "react";
import { colors as kolors, Theme, useTheme as useMom, createTheme, ThemeProvider } from "@mui/material";
import useShadeColor from "./useShadeColor";
import { UI } from "@Native/components/UI";
import { defaultComposer } from "default-composer";
import { Languages, languages_map } from "./../locales/languages";
import { useLocalStorage } from "usehooks-ts";
import { useNativeStorage } from "./useNativeStorage";
import { os } from "@Native/Os";
import { BuildConfig } from "@Native/BuildConfig";

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
  // Only load if it is android platform and above android 12
  ...(os.isAndroid
    ? os.androidSdk() >= 31
      ? [
          {
            name: "Monet (Android 12+)",
            value: "monet",
          },
        ]
      : []
    : []),
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

const monet = {
  50: os.getMonetColor("system_accent2_50"),
  100: os.getMonetColor("system_accent2_100"),
  200: os.getMonetColor("system_accent2_200"),
  300: os.getMonetColor("system_accent2_300"),
  400: os.getMonetColor("system_accent2_400"),
  500: os.getMonetColor("system_accent2_500"),
  600: os.getMonetColor("system_accent2_600"),
  700: os.getMonetColor("system_accent2_700"),
  800: os.getMonetColor("system_accent2_800"),
  900: os.getMonetColor("system_accent2_900"),
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
  // Only load if it is android platform and above android 12
  ...(os.isAndroid ? (os.androidSdk() >= 31 ? { monet: monet } : {}) : {}),
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
  };
};

export const SettingsProvider = (props: React.PropsWithChildren) => {
  const [settings, setSettings] = useNativeStorage<Settings.Root>("settings", INITIAL_SETTINGS);
  const shade = useShadeColor();

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
            light: shade(colors[settings.accent_scheme.value][300], -10),
            main: shade(colors[settings.accent_scheme.value][900], -29),
            // dark: shadeColor(colors[settings.accent_scheme.value][800], -40),
          },
          background: {
            default: shade(colors[settings.accent_scheme.value][800], -75),
          },
          divider: shade(colors[settings.accent_scheme.value][900], -81),
          secondary: {
            main: "#e5e8ec",
            light: shade(colors[settings.accent_scheme.value][800], -66),
            dark: shade(colors[settings.accent_scheme.value][800], -70),
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
