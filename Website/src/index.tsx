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
import { StringProvider } from "./hooks/useStrings";

dom.preventer(["contextmenu"]);
ons.platform.select("android");

ons.ready(() => {
  rct.render(
    <React.StrictMode>
      <StringProvider>
        <KarteiProvider>
          <DarkModeProvider>
            <ConfirmProvider>
              <CssBaseline />
              <LightTheme />
              <RoutedApp />
            </ConfirmProvider>
          </DarkModeProvider>
        </KarteiProvider>
      </StringProvider>
    </React.StrictMode>,
    "app"
  );
});
