import { infoLog } from "../functions";

export class I2CPort {
  portNumber: number = 0;

  constructor(portNumber: number) {
    infoLog("I2CPort:" + portNumber);
    this.init(portNumber);
  }

  /**
   * @function
   * @param portNumber ポート番号
   * ポート情報マッピング
   */
  init(portNumber: number): void {
    this.portNumber = portNumber;
  }

  /**
   * I2C ポート open 処理
   * @param slaveAddress スレーブアドレス
   */
  open(slaveAddress: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // new I2CSlaveDevice(this.portNumber, slaveAddress).then(
      //   (i2cslave) => {
      //     resolve(i2cslave);
      //   },
      //   (err) => {
      //     reject(err);
      //   },
      // );
    });
  }
}
