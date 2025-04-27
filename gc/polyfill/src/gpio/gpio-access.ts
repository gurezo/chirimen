import { WebSocketRouter } from "../websocket/websocket-router";
import { IGPIOAccess } from "./gpio-access.interface";
import { GPIOPort } from "./gpio-port";
import { IGPIOPort } from "./gpio-port.interface";

export class GPIOAccess implements IGPIOAccess {
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
  public async getPort(portNumber: number): Promise<IGPIOPort> {
    await this.router.waitConnection();

    if (!this.ports.has(portNumber)) {
      this.ports.set(portNumber, new GPIOPort(this.router, portNumber));
    }

    return this.ports.get(portNumber)!;
  }
}
