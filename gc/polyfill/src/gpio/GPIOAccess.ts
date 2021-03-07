import { GPIOPort } from './GPIOPort';

export class GPIOAccess {
  /** Raspberry Pi Pin Assign */
  private gpioPorts: number[] = [
    4,
    17,
    18,
    27,
    22,
    23,
    24,
    25,
    5,
    6,
    12,
    13,
    19,
    16,
    26,
    20,
    21,
  ];

  ports = new Map();
  unexportAll: null;
  onchange: null;

  /**
   * GPIOAccess 初期化処理
   * ポート情報マッピング
   */
  init() {
    this.ports = new Map();
    this.gpioPorts.forEach((port: number) => {
      this.ports.set(port, new GPIOPort(port));
    });
  }
}