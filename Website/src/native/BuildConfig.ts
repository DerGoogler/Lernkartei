import { Native } from "./Native";
import pkg from "../../package.json";

export class BuildConfigBase extends Native {
  private _config: { application_id: string; version_name: string; version_code: number };
  public constructor() {
    super();
    this.interface = "buildconfig";
    this._config = pkg.config;
  }

  public get DEBUG(): boolean {
    return this.isAndroid ? this.getInterface.DEBUG() : false;
  }
  public get APPLICATION_ID(): string {
    return this.isAndroid ? this.getInterface.APPLICATION_ID() : this._config.application_id;
  }
  public get BUILD_TYPE(): string {
    return this.isAndroid ? this.getInterface.BUILD_TYPE() : "release";
  }
  public get VERSION_CODE(): string {
    return this.isAndroid ? this.getInterface.VERSION_CODE() : this._config.version_code;
  }
  public get VERSION_NAME(): string {
    return this.isAndroid ? this.getInterface.VERSION_NAME() : this._config.version_name;
  }
}

export const BuildConfig = new BuildConfigBase();
