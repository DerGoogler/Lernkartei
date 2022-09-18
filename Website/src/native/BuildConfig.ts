import { NativeBase } from "./NativeBase";

export class BuildConfigBase extends NativeBase {
  public constructor() {
    super();
    this.interfaceType = "buildconfig";
  }

  public get DEBUG(): boolean {
    return this.isAndroid ? this.interface.DEBUG() : false;
  }
  public get APPLICATION_ID(): string {
    return this.isAndroid ? this.interface.APPLICATION_ID() : "";
  }
  public get BUILD_TYPE(): string {
    return this.isAndroid ? this.interface.BUILD_TYPE() : "";
  }
  public get VERSION_CODE(): string {
    return this.isAndroid ? this.interface.VERSION_CODE() : 0;
  }
  public get VERSION_NAME(): string {
    return this.isAndroid ? this.interface.VERSION_NAME() : "";
  }
}

export const BuildConfig = new BuildConfigBase();
