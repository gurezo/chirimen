import { WebSocketRouter } from "../websocket/websocket-router";
import { GPIOPort } from "./gpio-port";

export class GPIOAccess {
  private router: WebSocketRouter;
  private ports: Map<number, GPIOPort> = new Map();

  constructor(serverURL: string) {
    this.router = new WebSocketRouter(serverURL);
    this.router.init();
  }

  /**
   * GPIOポートを取得
   * @param portNumber ポート番号
   */
  public async getPort(portNumber: number): Promise<GPIOPort> {
    await this.router.waitConnection();

    if (!this.ports.has(portNumber)) {
      this.ports.set(portNumber, new GPIOPort(this.router, portNumber));
    }

    return this.ports.get(portNumber)!;
  }
}
