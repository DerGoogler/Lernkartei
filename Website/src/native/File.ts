import saveAs from "file-saver";
import { NativeBase } from "./NativeBase";

export class File extends NativeBase {
  private _path: string;
  public constructor(path: string) {
    super();
    this._path = path;
    this.interfaceType = "file";
  }
  /**
   * Creates a new file. Supports browser and Android native.
   * @param content
   */
  public create(content: string): void {
    // if (this.isAndroid) {
    // this.interface.create(this._path, content);
    // } else {
    const blob_ = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob_, this._path.substring(this._path.lastIndexOf("/") + 1));
    // }
  }
  public read(): string {
    return this.isAndroid ? this.interface.read(this._path) : "null";
  }
  public exists(): boolean {
    return this.isAndroid ? this.interface.exists(this._path) : true;
  }
  public isDirectory(): boolean {
    return this.isAndroid ? this.interface.isDirectory(this._path) : true;
  }
  public createJSON<T = any>(content: T, space?: string | number): void {
    this.create(JSON.stringify(content, null, space));
  }
  public readJSON<T = any>(): T {
    return JSON.parse(this.read());
  }
}
