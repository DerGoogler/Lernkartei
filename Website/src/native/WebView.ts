import ons from "onsenui";
import { dom } from "googlers-tools";
import { SharedPreferences } from "web-shared-preferences";
import { WebViewPrefs } from "./WebViewPrefs";
import { isTablet } from "react-device-detect";
import * as React from "react";

type Callback = () => void;

declare const nos: any;

interface WebView extends Window {
  open(url?: string | URL | undefined, target?: string | undefined, features?: string | undefined): Window | null;
  close(): void;
  toast(text: string, duration: "long" | "short"): void;
  setStatusBarColor(color: string, white: boolean): void;
  setNavigationBarColor(color: string): void;
  hasStoragePermission(): boolean;
  requestStoargePermission(): void;
  readonly pref: SharedPreferences;
  addNativeEventListener<K extends keyof WindowEventMap>(
    type: K,
    callback: Callback,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeNativeEventListener<K extends keyof WindowEventMap>(
    type: K,
    callback: Callback,
    options?: boolean | AddEventListenerOptions
  ): void;
  useOnBackPressed(callback: Callback): void;
}

class WebView implements WebView {
  private readonly userAgentAndroid = "KARTEI";
  public readonly userAgent = window.navigator.userAgent;
  public readonly isAndroid = this.userAgentAndroid === this.userAgent ? true : false;
  public readonly isTablet = this.IsTablet();

  public constructor() {
    this.IsTablet = this.IsTablet.bind(this);
  }

  private IsTablet(): boolean {
    if (this.isAndroid) {
      return nos.isTablet();
    } else {
      return isTablet;
    }
  }

  // OnsenUI
  public readonly ready = ons.ready;
  public readonly platform = ons.platform.select;
  // GT
  public readonly render = dom.render;

  public open(
    url?: string | URL | undefined,
    target?: string | undefined,
    features?: string | undefined
  ): Window | null {
    if (this.isAndroid) {
      return nos.open(url);
    } else {
      return window.open(url, target, features);
    }
  }

  /**
   * Closes the window. On Android closes the App
   */
  public close(): void {
    if (this.isAndroid) {
      nos.close();
    } else {
      window.close();
    }
  }

  /**
   * Makes an toast, even on Android
   * @param text
   * @param duration
   */
  public toast(text: string, duration: "long" | "short"): void {
    const _duration = duration === "short" ? (this.isAndroid ? 0 : 2000) : this.isAndroid ? 1 : 5000;
    if (this.isAndroid) {
      nos.makeToast(text, _duration);
    } else {
      ons.notification.toast(text, { timeout: _duration, animation: "fall" });
    }
  }

  /**
   * Changes the status bar color
   * @param color Your color
   * @param white `true` makes the status bar white
   */
  public setStatusBarColor(color: string, white: boolean): void {
    if (this.isAndroid) {
      nos.setStatusBarColor(color, white);
    } else {
      null;
    }
  }

  public setNavigationBarColor(color: string): void {
    if (this.isAndroid) {
      nos.setNavigationBarColor(color);
    } else {
      null;
    }
  }

  /**
   * Checks if the app has storage permissions, always `true` in web
   * @returns {boolean}
   */
  public hasStoragePermission(): boolean {
    if (this.isAndroid) {
      return nos.hasStoragePermission();
    } else {
      return true;
    }
  }

  /**
   * Requests storage permissions
   */
  public requestStoargePermission(): void {
    if (this.isAndroid) {
      nos.requestStoargePermission();
    } else {
      null;
    }
  }

  /**
   * Declares native shared preferences
   */
  public readonly pref: SharedPreferences = new WebViewPrefs();

  public addNativeEventListener<K extends keyof WindowEventMap>(
    type: K,
    callback: Callback,
    options?: boolean | AddEventListenerOptions
  ): void {
    (window as any)[type] = new Event(type.toLowerCase());

    window.addEventListener(type.toLowerCase(), callback, options);
  }

  public removeNativeEventListener<K extends keyof WindowEventMap>(
    type: K,
    callback: Callback,
    options?: boolean | AddEventListenerOptions
  ): void {
    (window as any)[type] = new Event(type.toLowerCase());

    window.removeEventListener(type.toLowerCase(), callback, options);
  }

  public useOnBackPressed(callback: Callback): void {
    React.useEffect(() => {
      this.addNativeEventListener("onbackbutton", callback, false);

      return () => {
        this.removeNativeEventListener("onbackbutton", callback, false);
      };
    }, []);
  }
}

type webview = typeof webview[keyof typeof webview];
const webview: WebView = new WebView();
export default webview;
