import { I2CPort } from "./i2c.port";

const i2cPorts: number[] = [1];

export class I2CAccess {
  ports: Map<any, any>;

  constructor() {
    this.ports = new Map();
    this.init();
  }

  /**
   * I2CAccess 初期化処理
   * ポート情報マッピング
   */
  init(): void {
    this.ports = new Map();
    for (var cnt = 0; cnt < i2cPorts.length; cnt++) {
      this.ports.set(i2cPorts[cnt], new I2CPort(i2cPorts[cnt]));
    }
  }
}
