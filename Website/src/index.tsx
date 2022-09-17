import { dom, obj, rct } from "googlers-tools";
import jss from "jss";
import preset from "jss-preset-default";
import ons from "onsenui";
import webview from "./native/WebView";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import RoutedApp from "./components/RoutedApp";

// Styles
import "onsenui/css/onsenui.css";
import "./styles/default.scss";
import light_theme from "./styles/light_theme";
import { theme } from "./theme";

// Setup theme
jss.setup(preset());
jss.createStyleSheet(light_theme).attach();

dom.preventer(["contextmenu"]);
ons.platform.select("android");
ons.ready(() => {
  rct.render(
    <ThemeProvider key="efusdoligjdfoighjdl;fkg" theme={theme}>
      <CssBaseline />
      <RoutedApp key="sdfjslkghkdsfhglksahjfoi;shjrgkjhn" />
    </ThemeProvider>,
    "app"
  );
});
