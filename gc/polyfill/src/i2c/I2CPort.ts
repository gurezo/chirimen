import { Route } from '../route/Route';

import { errLog, infoLog, printReadError, printWriteError } from '../utility/Utility';

export class I2CPort {

  /** ポート番号 */
  portNumber: number = 0;
  /** Route */
  bone: Route;

  /**
   * I2CPort constructor 処理
   * @param {*} portNumber ポート番号
   * @param {*} bone TBD
   * ポート情報マッピング
   */
  constructor(portNumber: number, bone: Route) {
    this.init(portNumber, bone);
  }

  init(portNumber: number, bone: Route) {
    this.portNumber = portNumber;
    this.bone = bone;
  }

  /**
   * @function
   * I2C ポート open 処理
   * @param {*} slaveAddress スレーブアドレス
   */
  open(slaveAddress): Promise<any> {
    return new Promise((resolve, reject) => {
      // new I2CSlaveDevice(this.portNumber, slaveAddress).then(
      //   (i2cslave) => {
      //     resolve(i2cslave);
      //   },
      //   (err) => {
      //     reject(err);
      //   }
      // );
    });
  }

}
