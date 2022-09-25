import ons from "onsenui";
import { Rules } from "../components/Markdown/rules";
import { os } from "../native/Os";
import { sharedpreferences, useNativeStorage } from "../native/SharedPreferences";

export namespace KPlugin {
  export interface Defination {
    name: string;
    description: string;
  }
  export interface Pref {
    id: string;
    exec: string;
  }
  export interface Request {
    id: string;
    name: string;
    description: string;
    plugin: string;
  }
}

export namespace MdPlugin {
  export interface Pref {
    id: string;
    rules: Rules;
  }
}

export interface KPlugin {
  id: string;
  require: (module: string) => any;
}

export function KPlugin(id: string): KPlugin {
  return {
    id: id,
    require: (module: string) => {
      switch (module) {
        case "os":
          return os;
        case "ons":
          return {
            notification: ons.notification,
          };
        case "mdplugin":
          return {
            addRules: MdPlugin(id).addRules,
          };

        default:
          return undefined;
      }
    },
  };
}

export function MdPlugin(id: string) {
  return {
    addRules: (rules: Rules) => {
      let tmp = sharedpreferences.getJSON<MdPlugin.Pref[]>("mdplugins", []);
      if (!tmp.some((elem) => elem?.id === id)) {
        tmp.push({
          id: id,
          rules: rules,
        });
        sharedpreferences.setJSON<MdPlugin.Pref[]>("mdplugins", tmp);
      }
    },
  };
}

export function useMdPlugin() {
  return useNativeStorage.json<MdPlugin.Pref[]>("mdplugins", []);
}

export function useKPlugin() {
  return useNativeStorage.json<KPlugin.Pref[]>("kplugins", []);
}
