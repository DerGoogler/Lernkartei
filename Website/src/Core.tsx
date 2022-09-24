import { createTheme, CssBaseline, ThemeOptions, ThemeProvider, useTheme } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import { useEffect, useState } from "react";
import { accent_colors, colors } from "./theme";
import { useDarkmode } from "./hooks/useDarkmode";
import { light_theme } from "./styles/light_theme";
import RoutedApp from "./components/RoutedApp";
import jss from "jss";
import preset from "jss-preset-default";
import { AccentColors, useScheme } from "./hooks/useScheme";

export function Core() {
  const theme = useTheme();
  const [darkmode, setDarkmode] = useDarkmode();
  const [scheme] = useScheme();

  function isDarkmode<T = any>(def: { light: T; dark: T }): T {
    return !darkmode ? def.light : def.dark;
  }

  const muiTheme = createTheme({
    shape: {
      borderRadius: 8,
    },
    ...isDarkmode<ThemeOptions>({
      light: {
        palette: {
          mode: "light",
          primary: {
            // @ts-ignore
            main: colors[scheme.value][900],
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
      },
      dark: {
        palette: {
          mode: "dark",
          primary: {
            main: colors.grey[900],
            contrastText: colors.grey.A200,
          },
          divider: colors.grey[700],
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

  useEffect(() => {
    // Setup theme
    jss.setup(preset());
    jss.createStyleSheet(light_theme(muiTheme)).attach();
  }, [theme, darkmode, scheme]);

  return (
    <ThemeProvider key="efusdoligjdfoighjdl;fkg" theme={muiTheme}>
      <CssBaseline />
      {/* @ts-ignore */}
      <ConfirmProvider>
        <RoutedApp key="sdfjslkghkdsfhglksahjfoi;shjrgkjhn" />
      </ConfirmProvider>
    </ThemeProvider>
  );
}
