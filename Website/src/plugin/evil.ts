import { Theme, useTheme } from "@mui/material";
import ons from "onsenui";
import saferEval from "safer-eval";
import { Core } from "../Core";
import { BuildConfig } from "../native/BuildConfig";
import { os } from "../native/Os";
import { theme } from "../theme";
import { KPlugin, MdPlugin } from "./kplugin";

export default function evil(javascriptString: string) {
  ("use strict");

  const removeAndroidNamespace = {
    window: {
      buildconfig: undefined,
      environment: undefined,
      file: undefined,
      os: undefined,
      sharedpreferences: undefined,
      utils: undefined,
    },
    buildconfig: undefined,
    environment: undefined,
    file: undefined,
    os: undefined,
    sharedpreferences: undefined,
    utils: undefined,
  };

  const context = {
    ...removeAndroidNamespace,
    init: (callback: (plugin: KPlugin, theme: Theme) => void) => {
      const plugin = KPlugin("");
      if (typeof callback == "function") {
        callback(plugin, theme as Theme);
      }
    },
    eval: undefined,
    document: undefined,
    require(lib: string) {
      switch (lib) {
        case "ons":
          return ons;
        case "os":
          return os;
        case "buildconfig":
          return BuildConfig;
        case "plugin:k":
          return KPlugin;
        case "plugin:md":
          return MdPlugin;
        default:
          return {};
      }
    },
  };

  try {
    saferEval(javascriptString, context);
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.log(e.message);
    }
  }
}
