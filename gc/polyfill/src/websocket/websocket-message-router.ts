import { WebSocketConnection } from "./websocket-connection";
import { WebSocketMessageHandler } from "./websocket-message-handler";

export class WebSocketMessageRouter {
  private messageHandler: WebSocketMessageHandler;
  private connection: WebSocketConnection;

  constructor(connection: WebSocketConnection) {
    this.connection = connection;
    this.messageHandler = new WebSocketMessageHandler();
  }

  public async send(func: number, data: Uint8Array): Promise<number[]> {
    const buf = await this.messageHandler.send(func, data);
    this.connection.send(new Uint8Array(buf).buffer);
    return buf;
  }

  public handleMessage(data: ArrayBuffer): void {
    const buffer = new Uint8Array(data);
    if (buffer[0] === 1) {
      this.messageHandler.receive(buffer);
    }
  }
}
