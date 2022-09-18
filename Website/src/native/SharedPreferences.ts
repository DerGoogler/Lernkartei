import React, { DependencyList } from "react";
import { SharedPreferences as LocalStorage } from "web-shared-preferences";
import { NativeBase } from "./NativeBase";

declare const nsharedpreferences: any;

/**
 * Simple class to manage the web local sotrage and the Android native preferences
 * @extends {NativeBase}
 */
class SharedPreferences extends NativeBase {
  private _pref: LocalStorage;

  public constructor() {
    super();
    this._pref = new LocalStorage();
    this.interfaceType = "nsharedpreferences";
  }

  private useForceRender() {
    const [, forceRender] = React.useReducer((x) => x + 1, 0);
    return forceRender;
  }

  private usePrefCore<T = any>(
    key: string,
    defValue: T,
    core_getter: (key: string, defValue: T) => T,
    core_setter: (key: string, value: T) => void
  ): [T, (value: T) => void] {
    const forceRender = this.useForceRender();
    // @ts-ignore
    const getter: T = core_getter(key, defValue);

    const setter = (value: T) => {
      core_setter(key, value);
      if (getter !== value) {
        forceRender();
      }
    };

    return [getter, setter];
  }

  public setString(key: string, value: string): void {
    if (this.isAndroid) {
      this.interface.setString(key, value);
    } else {
      this._pref.setString(key, value);
    }
  }

  public setBoolean(key: string, value: boolean): void {
    if (this.isAndroid) {
      this.interface.setBoolean(key, value);
    } else {
      this._pref.setBoolean(key, value);
    }
  }

  public setNumber(key: string, value: number): void {
    if (this.isAndroid) {
      this.interface.setNumber(key, value);
    } else {
      this._pref.setNumber(key, value);
    }
  }

  public setJSON<T = any>(key: string, value: T): void {
    if (this.isAndroid) {
      this.interface.setString(key, JSON.stringify(value));
    } else {
      this._pref.setJSON<T>(key, value);
    }
  }

  public getString(key: string, defValue: string): string {
    if (this.isAndroid) {
      return this.interface.getString(key, defValue);
    } else {
      return this._pref.getString(key, defValue);
    }
  }

  public useString(key: string, defValue: string): [string, (value: string) => void] {
    return this.usePrefCore<string>(
      key,
      defValue,
      (key, defValue) => this.getString(key, defValue),
      (key, value) => this.setString(key, value)
    );
  }

  public getBoolean(key: string, defValue: boolean): boolean {
    if (this.isAndroid) {
      return this.interface.getBoolean(key, defValue);
    } else {
      return this._pref.getBoolean(key, defValue);
    }
  }

  public useBoolean(key: string, defValue: boolean): [boolean, (value: boolean) => void] {
    return this.usePrefCore<boolean>(
      key,
      defValue,
      (key, defValue) => this.getBoolean(key, defValue),
      (key, value) => this.setBoolean(key, value)
    );
  }

  public getNumber(key: string, defValue: number): number {
    if (this.isAndroid) {
      return this.interface.getNumber(key, defValue);
    } else {
      return this._pref.getNumber(key, defValue);
    }
  }

  public useNumber(key: string, defValue: number): [number, (value: number) => void] {
    return this.usePrefCore<number>(
      key,
      defValue,
      (key, defValue) => this.getNumber(key, defValue),
      (key, value) => this.setNumber(key, value)
    );
  }

  public getJSON<T = any>(key: string, defValue: T): T {
    if (this.isAndroid) {
      return JSON.parse(nsharedpreferences.getString(key, JSON.stringify(defValue)));
    } else {
      return this._pref.getJSON<T>(key, defValue);
    }
  }

  public useJSON<T = any>(key: string, defValue: T): [T, (value: T) => void] {
    return this.usePrefCore<T>(
      key,
      defValue,
      (key, defValue) => this.getJSON(key, defValue),
      (key, value) => this.setJSON(key, value)
    );
  }

  public removePref(key: string): void {
    if (this.isAndroid) {
      this.interface.removePref(key);
    } else {
      this._pref.removePref(key);
    }
  }

  public clearPrefs(): void {
    if (this.isAndroid) {
      this.interface.clearPrefs();
    } else {
      this._pref.clearPrefs();
    }
  }
}

const sharedpreferences: SharedPreferences = new SharedPreferences();

export { SharedPreferences, sharedpreferences };
