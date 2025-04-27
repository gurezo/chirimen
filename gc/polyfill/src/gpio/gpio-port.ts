import { WebSocketRouter } from "../websocket/websocket-router";

export class GPIOPort {
  constructor(
    private router: WebSocketRouter,
    private portNumber: number,
  ) {}

  /**
   * GPIOポートの方向を設定
   * @param direction 方向（"in" または "out"）
   */
  public async setDirection(direction: "in" | "out"): Promise<void> {
    const data = new Uint8Array(2);
    data[0] = this.portNumber;
    data[1] = direction === "in" ? 0 : 1;
    await this.router.send(0x10, data);
  }

  /**
   * GPIOポートの値を読み取る
   */
  public async read(): Promise<number> {
    const data = new Uint8Array(1);
    data[0] = this.portNumber;
    const result = await this.router.send(0x11, data);
    return result[0];
  }

  /**
   * GPIOポートの値を設定
   * @param value 設定値（0 または 1）
   */
  public async write(value: number): Promise<void> {
    const data = new Uint8Array(2);
    data[0] = this.portNumber;
    data[1] = value;
    await this.router.send(0x12, data);
  }

  /**
   * GPIOポートの変化を監視
   * @param callback 変化時のコールバック関数
   */
  public onchange(callback: (value: number) => void): void {
    this.router.registerEvent(0x14, this.portNumber, (data) => {
      callback(data[5]);
    });
  }
}
