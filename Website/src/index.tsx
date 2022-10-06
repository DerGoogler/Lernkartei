import React from "react";
import ons from "onsenui";
import { dom, rct } from "googlers-tools";

// Styles
import "onsenui/css/onsenui.css";
import "./styles/default.scss";
import { CssBaseline } from "@mui/material";
import { LightTheme } from "./styles/light_theme";
import { ConfirmProvider } from "material-ui-confirm";
import RoutedApp from "./components/RoutedApp";
import { DarkModeProvider } from "./hooks/useDarkmode";
import { KarteiProvider } from "./hooks/useKartei";

dom.preventer(["contextmenu"]);
ons.platform.select("android");

ons.ready(() => {
  rct.render(
    <React.StrictMode>
      <KarteiProvider>
        <DarkModeProvider>
          <CssBaseline />
          <LightTheme />
          {/* @ts-ignore */}
          <ConfirmProvider>
            <RoutedApp />
          </ConfirmProvider>
        </DarkModeProvider>
      </KarteiProvider>
    </React.StrictMode>,
    "app"
  );
});
