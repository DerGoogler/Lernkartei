import { Dispatcher, SharedPreferences, StorageImpl } from "web-shared-preferences";
import { os } from "./Os";

/**
 * Simple ~class~ FUNCTION!!!!! to manage the web local sotrage and the Android native preferences
 * @extends {Native}
 */
function NativeStorage(): StorageImpl {
  const getInterface = window["sharedpreferences"];

  return {
    get length(): number {
      return 0;
    },

    setItem(key: string, value: string): void {
      if (os.isAndroid) {
        getInterface.setString(key, value);
      } else {
        localStorage.setItem(key, value);
      }
    },

    getItem(key: string): string | null {
      if (os.isAndroid) {
        return getInterface.getString(key);
      } else {
        return localStorage.getItem(key);
      }
    },

    clear(): void {
      if (os.isAndroid) {
        getInterface.clearPrefs();
      } else {
        localStorage.clear();
      }
    },

    removeItem(key: string): void {
      if (os.isAndroid) {
        getInterface.removePref(key);
      } else {
        localStorage.removeItem(key);
      }
    },

    key(index: number): string | null {
      return null;
    },
  };
}

const dispatcher = Dispatcher(NativeStorage());
const useNativeStorage = {
  string: dispatcher.useString,
  boolean: dispatcher.useBoolean,
  number: dispatcher.useNumber,
  json: dispatcher.useJSON,
};

const sharedpreferences = new SharedPreferences(NativeStorage());

export { useNativeStorage, sharedpreferences };
