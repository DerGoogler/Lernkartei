import saferEval from "safer-eval";
import { KPlugin } from "./kplugin";

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
    init: (name: string, callback: (plugin: KPlugin) => void) => {
      const plugin = KPlugin(name);
      if (typeof callback == "function") {
        callback(plugin);
      }
    },
    eval: undefined,
    document: undefined,
  };

  try {
    saferEval(javascriptString, context);
  } catch (e) {
    if (e instanceof SyntaxError) {
      console.log(e.message);
    }
  }
}
