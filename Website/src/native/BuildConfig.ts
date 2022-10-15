import { Native } from "./Native";

export class BuildConfigBase extends Native {
  public constructor() {
    super();
    this.interface = "buildconfig";
  }

  public get DEBUG(): boolean {
    return this.isAndroid ? this.getInterface.DEBUG() : false;
  }
  public get APPLICATION_ID(): string {
    return this.isAndroid ? this.getInterface.APPLICATION_ID() : "com.dergoogler.kartei";
  }
  public get BUILD_TYPE(): string {
    return this.isAndroid ? this.getInterface.BUILD_TYPE() : "debug";
  }
  public get VERSION_CODE(): string {
    return this.isAndroid ? this.getInterface.VERSION_CODE() : 104;
  }
  public get VERSION_NAME(): string {
    return this.isAndroid ? this.getInterface.VERSION_NAME() : "1.0.4";
  }
}

export const BuildConfig = new BuildConfigBase();
