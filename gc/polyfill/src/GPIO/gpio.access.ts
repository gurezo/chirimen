import { GPIOPort } from "./gpio.port";

export class GPIOAccess {
  /**
   * GPIOAccess
   * Raspberry Pi GPIO Port Number
   *
   * TODO: add portName and pinName
   * */
  private gpioPorts: number[] = [
    4, 17, 18, 27, 22, 23, 24, 25, 5, 6, 12, 13, 19, 16, 26, 20, 21,
  ];

  ports: Map<any, any>;
  unexportAll: any;
  onchange: any;

  constructor() {
    this.init();
    this.ports = new Map();
    this.unexportAll = null;
    this.onchange = null;
  }

  /**
   * @function
   * GPIOAccess 初期化処理
   * ポート情報マッピング
   */
  init(): void {
    this.ports = new Map();
    for (var cnt = 0; cnt < this.gpioPorts.length; cnt++) {
      this.ports.set(this.gpioPorts[cnt], new GPIOPort(this.gpioPorts[cnt]));
    }
  }
}
