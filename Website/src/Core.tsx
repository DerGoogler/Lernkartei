import { createTheme, CssBaseline, ThemeOptions, ThemeProvider, useTheme } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import { useEffect, useState } from "react";
import { accent_colors, colors, theme } from "./theme";
import { useDarkmode } from "./hooks/useDarkmode";
import { LightTheme } from "./styles/light_theme";
import RoutedApp from "./components/RoutedApp";
import jss from "jss";
import preset from "jss-preset-default";
import { useScheme } from "./hooks/useScheme";
import { Theme } from "@mui/system";

export function Core() {
  const [darkmode, setDarkmode] = useDarkmode();
  const [scheme] = useScheme();

  function isDarkmode<T = any>(def: { light: T; dark: T }): T {
    return !darkmode ? def.light : def.dark;
  }

  const muiTheme = createTheme(theme);

  useEffect(() => {
    // Setup theme
    jss.setup(preset());
    jss.createStyleSheet(LightTheme(muiTheme)).attach();
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
