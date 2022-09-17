import { createTheme, ThemeOptions, colors as kolors } from "@mui/material";
import webview from "./native/WebView";

export const IsDarkmode = webview.pref.getBoolean("darkmode", false);
export function isDarkmode<T = any>(def: { light: T; dark: T }): T {
  return !webview.pref.getBoolean("darkmode", false) ? def.light : def.dark;
}

type AccentColors = Array<{
  name: string;
  value: any;
}>;

export const accent_colors: AccentColors = [
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

export const default_scheme = webview.pref.getJSON<AccentColors[0]>("accent_scheme", accent_colors[0]);

export const theme = createTheme({
  shape: {
    borderRadius: 8,
  },
  ...isDarkmode<ThemeOptions>({
    light: {
      palette: {
        mode: "light",
        primary: {
          // @ts-ignore
          main: colors[default_scheme.value][900],
          contrastText: colors.grey[900],
        },
        secondary: {
          main: "#e5e8ec",
          contrastText: "",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: colors.grey[900],
          contrastText: colors.grey.A200,
        },
        secondary: {
          main: colors.grey[700],
          contrastText: "",
        },
        background: {
          default: colors.grey[800],
        },
      },
    },
  }),
});
