import { SharedPreferences as LocalStorage, usePref } from "web-shared-preferences";
import { Native } from "./Native";

declare const nsharedpreferences: any;

/**
 * Simple class to manage the web local sotrage and the Android native preferences
 * @extends {Native}
 */
class SharedPreferences extends Native {
  private _pref: LocalStorage;

  public constructor() {
    super();
    this._pref = new LocalStorage(window.localStorage);
    this.interface = "sharedpreferences";
  }

  public setString(key: string, value: string): void {
    if (this.isAndroid) {
      this.getInterface.setString(key, value);
    } else {
      this._pref.setString(key, value);
    }
  }

  public setBoolean(key: string, value: boolean): void {
    if (this.isAndroid) {
      this.getInterface.setBoolean(key, value);
    } else {
      this._pref.setBoolean(key, value);
    }
  }

  public setNumber(key: string, value: number): void {
    if (this.isAndroid) {
      this.getInterface.setNumber(key, value);
    } else {
      this._pref.setNumber(key, value);
    }
  }

  public setJSON<T = any>(key: string, value: T): void {
    if (this.isAndroid) {
      this.getInterface.setString(key, JSON.stringify(value));
    } else {
      this._pref.setJSON<T>(key, value);
    }
  }

  public getString(key: string, defValue: string): string {
    if (this.isAndroid) {
      return this.getInterface.getString(key, defValue);
    } else {
      return this._pref.getString(key, defValue);
    }
  }

  public getBoolean(key: string, defValue: boolean): boolean {
    if (this.isAndroid) {
      return this.getInterface.getBoolean(key, defValue);
    } else {
      return this._pref.getBoolean(key, defValue);
    }
  }

  public getNumber(key: string, defValue: number): number {
    if (this.isAndroid) {
      return this.getInterface.getNumber(key, defValue);
    } else {
      return this._pref.getNumber(key, defValue);
    }
  }

  public getJSON<T = any>(key: string, defValue: T): T {
    if (this.isAndroid) {
      return JSON.parse(this.getInterface.getString(key, JSON.stringify(defValue)));
    } else {
      return this._pref.getJSON<T>(key, defValue);
    }
  }

  public removePref(key: string): void {
    if (this.isAndroid) {
      this.getInterface.removePref(key);
    } else {
      this._pref.removePref(key);
    }
  }

  public clearPrefs(): void {
    if (this.isAndroid) {
      this.getInterface.clearPrefs();
    } else {
      this._pref.clearPrefs();
    }
  }
}

export function useString(key: string, defValue: string): [string, (value: string) => void] {
  const pref = new SharedPreferences();
  return usePref<string>(
    key,
    defValue,
    (key, defValue) => pref.getString(key, defValue),
    (key, value) => pref.setString(key, value)
  );
}

export function useBoolean(key: string, defValue: boolean): [boolean, (value: boolean) => void] {
  const pref = new SharedPreferences();
  return usePref<boolean>(
    key,
    defValue,
    (key, defValue) => pref.getBoolean(key, defValue),
    (key, value) => pref.setBoolean(key, value)
  );
}

export function useNumber(key: string, defValue: number): [number, (value: number) => void] {
  const pref = new SharedPreferences();
  return usePref<number>(
    key,
    defValue,
    (key, defValue) => pref.getNumber(key, defValue),
    (key, value) => pref.setNumber(key, value)
  );
}

export function useJSON<T = any>(key: string, defValue: T): [T, (value: T) => void] {
  const pref = new SharedPreferences();
  return usePref<T>(
    key,
    defValue,
    (key, defValue) => pref.getJSON(key, defValue),
    (key, value) => pref.setJSON(key, value)
  );
}

const sharedpreferences: SharedPreferences = new SharedPreferences();

export { SharedPreferences, sharedpreferences };
