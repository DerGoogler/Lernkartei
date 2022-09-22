import { NativeBase } from "./NativeBase";

export class Environment extends NativeBase {
  public constructor() {
    super();
    this.interfaceType = "environment";
  }

  public hasPermission(req: string): boolean {
    return this.isAndroid ? this.interface.hasPermission(req) : true;
  }

  public requestPermission(req: string): void {
    this.isAndroid ? this.interface.requestPermission(req) : null;
  }
}
