import { SharedPreferences } from "web-shared-preferences";
import webview from "./WebView";

declare const nsharedpreferences: any;

/**
 * Simple class to manage the web local sotrage and the Android native preferences
 */
class WebViewPrefs extends SharedPreferences implements SharedPreferences {
  public length: number = 0;

  public constructor() {
    super();
  }

  public setString(key: string, value: string): void {
    if (webview.isAndroid) {
      nsharedpreferences.setString(key, value);
    } else {
      super.setString(key, value);
    }
  }

  public setBoolean(key: string, value: boolean): void {
    if (webview.isAndroid) {
      nsharedpreferences.setBoolean(key, value);
    } else {
      super.setBoolean(key, value);
    }
  }

  public setNumber(key: string, value: number): void {
    if (webview.isAndroid) {
      nsharedpreferences.setNumber(key, value);
    } else {
      super.setNumber(key, value);
    }
  }

  public setJSON<T = any>(key: string, value: T): void {
    if (webview.isAndroid) {
      nsharedpreferences.setString(key, JSON.stringify(value));
    } else {
      super.setJSON<T>(key, value);
    }
  }

  public getString(key: string, defValue: string): string {
    if (webview.isAndroid) {
      return nsharedpreferences.getString(key, defValue);
    } else {
      return super.getString(key, defValue);
    }
  }

  public getBoolean(key: string, defValue: boolean): boolean {
    if (webview.isAndroid) {
      return nsharedpreferences.getBoolean(key, defValue);
    } else {
      return super.getBoolean(key, defValue);
    }
  }

  public getNumber(key: string, defValue: number): number {
    if (webview.isAndroid) {
      return nsharedpreferences.getNumber(key, defValue);
    } else {
      return super.getNumber(key, defValue);
    }
  }

  public getJSON<T = any>(key: string, defValue: T): T {
    if (webview.isAndroid) {
      return JSON.parse(nsharedpreferences.getString(key, JSON.stringify(defValue)));
    } else {
      return super.getJSON<T>(key, defValue);
    }
  }

  public removePref(key: string): void {
    if (webview.isAndroid) {
      nsharedpreferences.removePref(key);
    } else {
      super.removePref(key);
    }
  }

  public clearPrefs(): void {
    if (webview.isAndroid) {
      nsharedpreferences.clearPrefs();
    } else {
      super.clearPrefs();
    }
  }
}

export { WebViewPrefs };
