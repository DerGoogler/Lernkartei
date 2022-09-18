import { isTablet } from "react-device-detect";

/**
 * Core functions for native functions/interfaces
 */
export class NativeBase {
  private readonly userAgentAndroid = "KARTEI";
  public readonly userAgent = window.navigator.userAgent;
  public readonly isAndroid = this.userAgentAndroid === this.userAgent ? true : false;
  public readonly isTablet = this.IsTablet();
  public interfaceType: string;

  public constructor() {
    this.IsTablet = this.IsTablet.bind(this);
    this.interfaceType = "";
  }

  private IsTablet(): boolean {
    if (this.isAndroid) {
      return (window["os" as any] as any).isTablet();
    } else {
      return isTablet;
    }
  }

  public get interface(): any {
    // @ts-ignore
    return window[this.interfaceType];
  }
}
