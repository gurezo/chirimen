import { WebSocketRouter } from "../websocket/websocket-router";
import { I2CSlaveDevice } from "./i2c-slave-device";

export class I2CPort {
  private devices: Map<number, I2CSlaveDevice> = new Map();

  constructor(
    private router: WebSocketRouter,
    private portNumber: number,
  ) {}

  /**
   * I2Cスレーブデバイスを取得
   * @param slaveAddress スレーブアドレス
   */
  public async getSlaveDevice(slaveAddress: number): Promise<I2CSlaveDevice> {
    await this.router.waitConnection();

    if (!this.devices.has(slaveAddress)) {
      this.devices.set(
        slaveAddress,
        new I2CSlaveDevice(this.router, this.portNumber, slaveAddress),
      );
    }

    return this.devices.get(slaveAddress)!;
  }
}
