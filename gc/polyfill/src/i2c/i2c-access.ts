import { WebSocketRouter } from "../websocket/websocket-router";
import { I2CPort } from "./i2c-port";

export class I2CAccess {
  private router: WebSocketRouter;
  private ports: Map<number, I2CPort> = new Map();

  constructor(serverURL: string) {
    this.router = new WebSocketRouter(serverURL);
    this.router.init();
  }

  /**
   * I2Cポートを取得
   * @param portNumber ポート番号
   */
  public async getPort(portNumber: number): Promise<I2CPort> {
    await this.router.waitConnection();

    if (!this.ports.has(portNumber)) {
      this.ports.set(portNumber, new I2CPort(this.router, portNumber));
    }

    return this.ports.get(portNumber)!;
  }
}
