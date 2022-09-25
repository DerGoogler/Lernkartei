import React from "react";
import ons from "onsenui";
import { dom, rct } from "googlers-tools";

// Styles
import "onsenui/css/onsenui.css";
import "./styles/default.scss";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LightTheme } from "./styles/light_theme";
import { ConfirmProvider } from "material-ui-confirm";
import RoutedApp from "./components/RoutedApp";
import { theme } from "./theme";

dom.preventer(["contextmenu"]);
ons.platform.select("android");

ons.ready(() => {
  rct.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LightTheme />
        {/* @ts-ignore */}
        <ConfirmProvider>
          <RoutedApp />
        </ConfirmProvider>
      </ThemeProvider>
    </React.StrictMode>,
    "app"
  );
});
