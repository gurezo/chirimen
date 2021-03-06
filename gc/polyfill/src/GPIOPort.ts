export class GPIOPort {

  /** ポート番号 */
  portNumber: number;
  /** ポート名 */
  portName: string;
  /** ピン名 */
  pinName: string;
  /** 出力方向 */
  direction: string;
  /** 出力フラグ */
  exported = false;
  /** 設定値 */
  value = null;

  /**
   * GPIOPort constructor 処理
   * @param {*} portNumber ポート番号
   * ポート情報マッピング
   */
  constructor(portNumber: number) {
    this.init(portNumber);
  }

  /**
   * GPIO 初期化処理
   * @param {*} portNumber ポート番号
   * ポート情報マッピング
   */
  init(portNumber: number) {
    this.portNumber = portNumber;
    this.portName = "";
    this.pinName = "";
    this.direction = "";
    this.exported = false;
    this.value = null;
    this.onchange = null;
  }

  /**
   * GPIOポート接続処理
   * @param {*} direction 入出力方向情報
   * @return {*} TBD
   */
  export(direction: string): Promise<any> {
    return new Promise((resolve, reject) => {

    });
  }

  /**
   * GPIO 読み取り処理
   * @return {*} TBD
   */
  read(): Promise<any> {
    return new Promise((resolve, reject) => {

    });
  }

  /**
   * GPIO 書き込み処理
   * @param {*} value 書き込みデータ
   * @return {*} TBD
   */
  write(): Promise<any> {
    return new Promise((resolve, reject) => {

    });
  }

  onchange() {
    // TODO: 状態変化処理
  }

  /**
   * @function
   * GPIOポート開放処理
   */
  unexport(): Promise<any> {
    return new Promise((resolve, reject) => {

    });
  }
}