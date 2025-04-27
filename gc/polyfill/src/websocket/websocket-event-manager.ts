import { errLog, infoLog } from "../logger";

type CallbackFunction = (data: number[]) => void;

export class WebSocketEventManager {
  private onevents: Map<number, CallbackFunction> = new Map();

  public registerEvent(f: number, port: number, func: CallbackFunction): void {
    const key = (f << 8) | port;
    this.onevents.set(key, func);
  }

  public removeEvent(f: number, port: number): void {
    const key = (f << 8) | port;
    this.onevents.delete(key);
  }

  public handleEvent(data: Uint8Array): void {
    if (!(data instanceof Uint8Array)) {
      errLog(new TypeError("Please using with Uint8Array buffer."));
      return;
    }

    const key = (data[3] << 8) | data[4];
    const func = this.onevents.get(key);

    if (typeof func === "function") {
      infoLog("onevent");
      func(Array.from(data));
    }
  }
}
