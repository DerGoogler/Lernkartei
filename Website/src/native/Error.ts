import { Native } from "./Native";

export class RuntimeException extends Native {
  public constructor(message: string) {
    super();
    this.interface = "utils";
    if (this.isAndroid) {
      throw this.getInterface.runtimeException(message);
    } else {
      throw new Error(message);
    }
  }
}

export class Exception extends Native {
  public constructor(message: string) {
    super();
    this.interface = "utils";
    if (this.isAndroid) {
      throw this.getInterface.exception(message);
    } else {
      throw new Error(message);
    }
  }
}
