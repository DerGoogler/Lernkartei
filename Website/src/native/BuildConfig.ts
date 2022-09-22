import { Native } from "./Native";

export class BuildConfigBase extends Native<AndroidBuildConfig> {
  public constructor() {
    super();
    this.interface = "buildconfig";
  }

  public readonly DEBUG: boolean = this.isAndroid ? this.getInterface.DEBUG() : false;
  public readonly APPLICATION_ID: string = this.isAndroid ? this.getInterface.APPLICATION_ID() : "";
  public readonly BUILD_TYPE: string = this.isAndroid ? this.getInterface.BUILD_TYPE() : "";
  public readonly VERSION_CODE: number = this.isAndroid ? this.getInterface.VERSION_CODE() : 0;
  public readonly VERSION_NAME: string = this.isAndroid ? this.getInterface.VERSION_NAME() : "";
}

export const BuildConfig = new BuildConfigBase();
