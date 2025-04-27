import { errLog, infoLog } from "../logger";

export class WebSocketConnection {
  private wss: WebSocket | null = null;
  private status: number = 0; // 0: init 1: wait connection 2: connected

  constructor(private serverURL: string) {}

  public init(): void {
    infoLog("bone.init()");
    this.wss = new WebSocket(this.serverURL);
    this.wss.binaryType = "arraybuffer";
    this.status = 1;
  }

  public getStatus(): number {
    return this.status;
  }

  public setStatus(status: number): void {
    this.status = status;
  }

  public getWebSocket(): WebSocket | null {
    return this.wss;
  }

  public setOnOpen(callback: () => void): void {
    if (this.wss) {
      this.wss.onopen = () => {
        infoLog("onopen");
        callback();
      };
    }
  }

  public setOnError(callback: (error: Event) => void): void {
    if (this.wss) {
      this.wss.onerror = (error) => {
        errLog(error.toString());
        callback(error);
      };
    }
  }

  public setOnMessage(callback: (data: ArrayBuffer) => void): void {
    if (this.wss) {
      this.wss.onmessage = (event) => {
        callback(event.data);
      };
    }
  }

  public send(data: ArrayBuffer): void {
    if (this.wss) {
      this.wss.send(data);
    }
  }
}
