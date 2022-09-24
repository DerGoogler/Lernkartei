import ons from "onsenui";
import React from "react";
import { Native } from "./Native";

export namespace Os {
  export type OpenOptions = {
    target?: string | undefined;
    features?:
      | {
          window?: string | undefined;
          /**
           * Only for Android
           */
          color?: string | undefined;
        }
      | undefined;
  };
}

class Os extends Native {
  public constructor() {
    super();
    this.interface = "os";
  }

  public open(url?: string | URL | undefined, options?: Os.OpenOptions): Window | null {
    if (this.isAndroid) {
      return this.getInterface.open(url, options?.features?.color || "#fffddd");
    } else {
      return window.open(url, options?.target, options?.features?.window);
    }
  }

  /**
   * Closes the window. On Android closes the App
   */
  public close(): void {
    this.isAndroid ? this.getInterface.close() : window.close();
  }

  /**
   * Makes an toast, even on Android
   * @param text
   * @param duration
   */
  public toast(text: string, duration: "long" | "short"): void {
    const _duration = duration === "short" ? (this.isAndroid ? 0 : 2000) : this.isAndroid ? 1 : 5000;
    if (this.isAndroid) {
      this.getInterface.makeToast(text, _duration);
    } else {
      ons.notification.toast(text, { timeout: _duration, animation: "fall" });
    }
  }

  public getMonetColor(id: string): string {
    if (this.isAndroid) {
      return this.getInterface.getMonetColor(id);
    } else {
      return "#ffffff";
    }
  }

  /**
   * Changes the status bar color
   * @param color Your color
   * @param white `true` makes the status bar white
   */
  public setStatusBarColor(color: string, white: boolean): void {
    this.isAndroid ? this.getInterface.setStatusBarColor(color, white) : null;
  }

  public setNavigationBarColor(color: string): void {
    this.isAndroid ? this.getInterface.setNavigationBarColor(color) : null;
  }

  public addNativeEventListener<K extends keyof WindowEventMap>(
    type: K,
    callback: () => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    (window as any)[type] = new Event(type.toLowerCase());
    window.addEventListener(type.toLowerCase(), callback, options);
  }

  public removeNativeEventListener<K extends keyof WindowEventMap>(
    type: K,
    callback: () => void,
    options?: boolean | AddEventListenerOptions
  ): void {
    (window as any)[type] = new Event(type.toLowerCase());
    window.removeEventListener(type.toLowerCase(), callback, options);
  }

  public useOnBackPressed(callback: () => void): void {
    React.useEffect(() => {
      this.addNativeEventListener("onbackbutton", callback, false);

      return () => {
        this.removeNativeEventListener("onbackbutton", callback, false);
      };
    }, []);
  }
  public useOnResume(callback: () => void): void {
    React.useEffect(() => {
      this.addNativeEventListener("onresume", callback, false);

      return () => {
        this.removeNativeEventListener("onresume", callback, false);
      };
    }, []);
  }
}

export const os: Os = new Os();
