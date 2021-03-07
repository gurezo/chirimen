import { I2CPort } from './I2CPort';
import { Route } from '../route/Route';

export class I2CAccess {

  i2cPorts: number[] = [1];
  ports = new Map();

  constructor(bone: Route) {
    this.init(bone);
  }

  /**
   * I2CAccess 初期化処理
   * ポート情報マッピング
   */
  init(bone: Route) {
    this.ports = new Map();
    this.i2cPorts.forEach((i2cPort: number) => this.ports.set(i2cPort, new I2CPort(i2cPort, bone)));
  }

}
