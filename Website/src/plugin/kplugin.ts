import { Rules } from "../components/Markdown/rules";
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
  name: string;
}

export function KPlugin(name: string): KPlugin {
  return {
    name: name,
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
