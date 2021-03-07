import { errLog, infoLog, sleep } from '../common/Common';

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
      let dir = -1;
      if (direction === "out") {
        dir = 0;
        // bone.removeEvent(0x14, this.portNumber);
      } else if (direction === "in") {
        dir = 1;
        //        console.dir(bone);
        // bone.registerEvent(0x14, this.portNumber, (buf) => {
        //   if (typeof this.onchange === "function") {
        //     infoLog("onchange");
        //     this.onchange(buf[5]);
        //   }
        // });
      } else {
        reject("export:direction not valid! [" + direction + "]");
      }
      infoLog("export: Port:" + this.portNumber + " direction=" + direction);
      const data = new Uint8Array([this.portNumber, dir]);
      // bone.send(0x10, data).then(
      //   (result) => {
      //     if (result[0] == 0) {
      //       errLog(
      //         [
      //           `GPIO${this.portNumber}への接続に失敗しました。`,
      //           "他のウィンドウ/タブなど別のプロセスが既に同じピン番号を使用している可能性があります。",
      //         ].join("")
      //       );
      //       reject("GPIOPort(" + this.portNumber + ").export() error");
      //     } else {
      //       resolve();
      //     }
      //   },
      //   (error) => {
      //     reject(error);
      //   }
      // );
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
   * GPIOポート開放処理
   * @return {*} TBD
   */
  unexport(): Promise<any> {
    return new Promise((resolve, reject) => {

    });
  }
}