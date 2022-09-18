import { NativeBase } from "./NativeBase";

export class Environment extends NativeBase {
  public constructor() {
    super();
    this.interfaceType = "environment";
  }
  /**
   * Checks if the app has storage permissions, always `true` in web
   * @returns {boolean}
   */
  public hasStoragePermission(): boolean {
    return this.isAndroid ? this.interface.hasStoragePermission() : true;
  }

  /**
   * Requests storage permissions
   */
  public requestStoargePermission(): void {
    this.isAndroid ? this.interface.requestStoargePermission() : null;
  }
}
