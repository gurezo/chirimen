import { WebSocketRouter } from "../websocket/websocket-router";
import { II2CSlaveDevice } from "./i2c-slave-device.interface";

export class I2CSlaveDevice implements II2CSlaveDevice {
  constructor(
    private router: WebSocketRouter,
    private portNumber: number,
    private slaveAddress: number,
  ) {}

  /**
   * I2Cデバイスからデータを読み取る
   * @param length 読み取るバイト数
   */
  public async read(length: number): Promise<number[]> {
    const data = new Uint8Array(3);
    data[0] = this.portNumber;
    data[1] = this.slaveAddress;
    data[2] = length;
    return await this.router.send(0x21, data);
  }

  /**
   * I2Cデバイスにデータを書き込む
   * @param data 書き込むデータ
   */
  public async write(data: Uint8Array): Promise<void> {
    const sendData = new Uint8Array(2 + data.length);
    sendData[0] = this.portNumber;
    sendData[1] = this.slaveAddress;
    for (let i = 0; i < data.length; i++) {
      sendData[2 + i] = data[i];
    }
    await this.router.send(0x20, sendData);
  }

  /**
   * I2Cデバイスにデータを書き込み、その後データを読み取る
   * @param writeData 書き込むデータ
   * @param readLength 読み取るバイト数
   */
  public async writeRead(
    writeData: Uint8Array,
    readLength: number,
  ): Promise<number[]> {
    const sendData = new Uint8Array(3 + writeData.length);
    sendData[0] = this.portNumber;
    sendData[1] = this.slaveAddress;
    sendData[2] = readLength;
    for (let i = 0; i < writeData.length; i++) {
      sendData[3 + i] = writeData[i];
    }
    return await this.router.send(0x22, sendData);
  }
}
