import saveAs from "file-saver";
import { Native } from "./Native";

export class File extends Native {
  private _path: string;
  public constructor(path: string) {
    super();
    this._path = path;
    this.interface = "file";
  }
  /**
   * Creates a new file. Supports browser and Android native.
   * @param content
   */
  public create(content: string): void {
    if (this.isAndroid) {
      this.getInterface.create(this._path, content);
    } else {
      const blob_ = new Blob([content], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob_, this._path.substring(this._path.lastIndexOf("/") + 1));
    }
  }
  public read(): string {
    return this.isAndroid ? this.getInterface.read(this._path) : "null";
  }
  public list(): string[] {
    return this.isAndroid ? this.getInterface.list().split(",") : ["null"];
  }
  public exists(): boolean {
    return this.isAndroid ? this.getInterface.exists(this._path) : true;
  }
  public isDirectory(): boolean {
    return this.isAndroid ? this.getInterface.isDirectory(this._path) : true;
  }
  public createJSON<T = any>(content: T, space?: string | number): void {
    this.create(JSON.stringify(content, null, space));
  }
  public readJSON<T = any>(): T {
    return JSON.parse(this.read());
  }
}
