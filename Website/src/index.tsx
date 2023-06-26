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
import { SettingsProvider } from "./hooks/useSettings";
import { KarteiProvider } from "./hooks/useKartei";
import { StringProvider } from "./hooks/useStrings";
import { Preventer, render } from "react-render-tools";

ons.platform.select("android");

ons.ready(() => {
  // @ts-ignore
  window.onbackbutton = new Event("onbackbutton");

  render(
    <React.StrictMode>
      <Preventer prevent="contextmenu">
        <SettingsProvider>
          <StringProvider>
            <KarteiProvider>
              <ConfirmProvider>
                <CssBaseline />
                <LightTheme />
                <RoutedApp />
              </ConfirmProvider>
            </KarteiProvider>
          </StringProvider>
        </SettingsProvider>
      </Preventer>
    </React.StrictMode>,
    "app"
  );
});
