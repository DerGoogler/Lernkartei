export class BuildConfig {
  public static get DEBUG(): boolean {
    return window.buildconfig ? window.buildconfig.DEBUG() : false;
  }
  public static get APPLICATION_ID(): string {
    return window.buildconfig ? window.buildconfig.APPLICATION_ID() : "";
  }
  public static get BUILD_TYPE(): string {
    return window.buildconfig ? window.buildconfig.BUILD_TYPE() : "";
  }
  public static get VERSION_CODE(): string {
    return window.buildconfig ? window.buildconfig.VERSION_CODE() : 0;
  }
  public static get VERSION_NAME(): string {
    return window.buildconfig ? window.buildconfig.VERSION_NAME() : "";
  }
}
