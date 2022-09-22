import { dom, rct } from "googlers-tools";
import jss from "jss";
import preset from "jss-preset-default";
import ons from "onsenui";
import { CssBaseline, ThemeProvider } from "@mui/material";
import RoutedApp from "./components/RoutedApp";

// Styles
import "onsenui/css/onsenui.css";
import "./styles/default.scss";
import light_theme from "./styles/light_theme";
import { theme } from "./theme";
import { ConfirmProvider } from "material-ui-confirm";
import React from "react";

// Setup theme
jss.setup(preset());
jss.createStyleSheet(light_theme(theme)).attach();

dom.preventer(["contextmenu"]);
ons.platform.select("android");
ons.ready(() => {
  rct.render(
    <React.StrictMode>
      <ThemeProvider key="efusdoligjdfoighjdl;fkg" theme={theme}>
        <CssBaseline />
        {/* @ts-ignore */}
        <ConfirmProvider>
          <RoutedApp key="sdfjslkghkdsfhglksahjfoi;shjrgkjhn" />
        </ConfirmProvider>
      </ThemeProvider>
    </React.StrictMode>,
    "app"
  );
});
