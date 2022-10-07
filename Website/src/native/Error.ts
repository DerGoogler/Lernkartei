import { Native } from "./Native";

export class RuntimeException extends Native {
  public constructor(message: string) {
    super();
    this.interface = "utils";
    if (this.isAndroid) {
      this.getInterface.runtimeException(message);
    } else {
      new Error(message);
    }
  }
}

export class Exception extends Native {
  public constructor(message: string) {
    super();
    this.interface = "utils";
    if (this.isAndroid) {
      this.getInterface.exception(message);
    } else {
      new Error(message);
    }
  }
}
