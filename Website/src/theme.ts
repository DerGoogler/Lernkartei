import { colors as kolors, Theme, ThemeOptions, createTheme } from "@mui/material";
import { AccentColors } from "./hooks/useScheme";
import { sharedpreferences } from "./native/SharedPreferences";
export { AccentColors } from "./hooks/useScheme";

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

export const default_scheme = sharedpreferences.getJSON<AccentColors[0]>("accent_scheme", accent_colors[0]);

export const theme = createTheme({
  shape: {
    borderRadius: 8,
  },
  palette: {
    mode: "light",
    primary: {
      light: colors[default_scheme.value][300],
      main: colors[default_scheme.value][900],
      // @ts-ignore
      // dark: colors[default_scheme.value][800],
      contrastText: colors.grey[900],
    },
    background: {
      default: "#fafafa",
    },
    divider: "#e5e8ec",
    secondary: {
      main: "#e5e8ec",
      contrastText: "",
    },
  },
});
