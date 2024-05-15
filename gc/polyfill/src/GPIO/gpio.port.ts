import { infoLog } from "../functions";

export class GPIOPort {
  portNumber: number = 0;
  portName: string = "";
  pinName: string = "";
  direction: string = "";
  exported: boolean = false;
  value = null;
  onchange = null;

  constructor(portNumber: number) {
    infoLog("GPIOPort:" + portNumber);
    this.init(portNumber);
  }

  /**
   * GPIOAccess 初期化処理
   * ポート情報マッピング
   */
  init(portNumber: number): void {
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
   * @param direction 入出力方向情報
   */
  export(direction: any): Promise<void> {
    return new Promise((resolve, reject) => {
      var dir = -1;
      if (direction === "out") {
        // dir = 0;
        // bone.removeEvent(0x14, this.portNumber);
      } else if (direction === "in") {
        // dir = 1;
        // //        console.dir(bone);
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
      // var data = new Uint8Array([this.portNumber, dir]);
      // bone.send(0x10, data).then(
      //   (result) => {
      //     if (result[0] == 0) {
      //       errLog(
      //         [
      //           `GPIO${this.portNumber}への接続に失敗しました。`,
      //           "他のウィンドウ/タブなど別のプロセスが既に同じピン番号を使用している可能性があります。",
      //         ].join(""),
      //       );
      //       reject("GPIOPort(" + this.portNumber + ").export() error");
      //     } else {
      //       resolve();
      //     }
      //   },
      //   (error) => {
      //     reject(error);
      //   },
      // );
    });
  }

  /**
   * GPIO 読み取り処理
   */
  read(): Promise<void> {
    return new Promise((resolve, reject) => {
      // infoLog("read: Port:" + this.portNumber);
      // var data = new Uint8Array([this.portNumber]);
      // bone.send(0x12, data).then(
      //   (result) => {
      //     if (result[0] == 0) {
      //       errLog(`GPIO${this.portNumber}から値の取得に失敗しました。`);
      //       reject("GPIOPort(" + this.portNumber + ").read() error");
      //     } else {
      //       resolve(result[1]);
      //     }
      //   },
      //   (error) => {
      //     reject(error);
      //   },
      // );
    });
  }

  /**
   * GPIO 書き込み処理
   * @param value 書き込みデータ
   */
  write(value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      infoLog("write: Port:" + this.portNumber + " value=" + value);
      //   var data = new Uint8Array([this.portNumber, value]);
      //   bone.send(0x11, data).then(
      //     (result) => {
      //       if (result[0] == 0) {
      //         errLog(`GPIO${this.portNumber}に値の設定に失敗しました。`);
      //         reject("GPIOPort(" + this.portNumber + ").write() error");
      //       } else {
      //         resolve();
      //       }
      //     },
      //     (error) => {
      //       reject(error);
      //     },
      //   );
    });
  }

  /**
   * GPIOポート開放処理
   */
  unexport(): Promise<void> {
    return new Promise((resolve, reject) => {
      infoLog("unexport: Port:" + this.portNumber);
      // var data = new Uint8Array([this.portNumber, value]);
      // bone.send(0x13, data).then(
      //   (result) => {
      //     if (result[0] == 0) {
      //       errLog(`GPIO${this.portNumber}の開放に失敗しました。`);
      //       reject("GPIOPort(" + this.portNumber + ").unexport() error");
      //     } else {
      //       resolve();
      //     }
      //   },
      //   (error) => {
      //     reject(error);
      //   },
      // );
    });
  }
}
