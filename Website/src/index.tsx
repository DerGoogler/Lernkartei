import { dom, obj, rct } from "googlers-tools";
import jss from "jss";
import preset from "jss-preset-default";
import ons from "onsenui";
import webview from "./native/WebView";
import { createTheme, ThemeProvider } from "@mui/material";
import RoutedApp from "./components/RoutedApp";

// Styles
import "onsenui/css/onsenui.css";
import "./styles/default.scss";
import light_theme from "./styles/light_theme";

// Setup theme
jss.setup(preset());
jss.createStyleSheet(light_theme).attach();

export function isDarkmode<T = any>(light: T, dark: T): T {
  return !webview.pref.getBoolean("darkmode", false) ? light : dark;
}

const theme = createTheme({
  palette: {
    mode: isDarkmode("light", "dark"),
    primary: {
      main: "#4a148c",
      dark: "#bb86fc",
    },
    secondary: {
      main: "rgb(85, 46, 132)",
    },
  },
});
dom.preventer(["contextmenu"]);
ons.platform.select("android");
ons.ready(() => {
  rct.render(
    <ThemeProvider key="efusdoligjdfoighjdl;fkg" theme={theme}>
      <RoutedApp key="sdfjslkghkdsfhglksahjfoi;shjrgkjhn" />
    </ThemeProvider>,
    "app"
  );
});
