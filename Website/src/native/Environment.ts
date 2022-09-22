import { Native } from "./Native";

export class Environment extends Native {
  public constructor() {
    super();
    this.interface = "environment";
  }

  public hasPermission(req: string): boolean {
    return this.isAndroid ? this.getInterface.hasPermission(req) : true;
  }

  public requestPermission(req: string): void {
    this.isAndroid ? this.getInterface.requestPermission(req) : null;
  }
}
