import { infoLog } from "../functions";

export class Route {
  wss = null;
  // send = null;
  queue = null; // function queue
  onevents = null; // onevent queue
  waitQueue = null;
  status = 0; // 0: init 1: wait connection 2: connected
  session = 0;

  constructor() {
    // Do something
  }

  /**
   * GPIO 初期化処理
   * @param serverURL WebSocket サーバーURL
   */
  init(serverURL: string): void {
    infoLog("bone.init()");
    // this.waitQueue = new Array();
    // this.queue = new Map();
    // this.onevents = new Map();
    // this.wss = new WebSocket(serverURL);
    // this.wss.binaryType = "arraybuffer";
    // this.status = 1;
    // this.wss.onopen = () => {
    //   infoLog("onopen");
    //   for (var cnt = 0; cnt < this.waitQueue.length; cnt++) {
    //     if (typeof this.waitQueue[cnt] === "function") {
    //       this.waitQueue[cnt](true);
    //     }
    //   }
    //   this.status = 2;
    //   this.waitQueue = [];
    // };
    // this.wss.onerror = (error) => {
    //   errLog(error);
    //   errLog(
    //     [
    //       "Node.jsプロセスとの接続に失敗しました。",
    //       "CHIRIMEN for Raspberry Piやその互換環境でのみ実行可能です。",
    //       "https://r.chirimen.org/tutorial",
    //     ].join("\n"),
    //   );
    //   var length = this.waitQueue ? this.waitQueue.length : 0;
    //   for (var cnt = 0; cnt < length; cnt++) {
    //     if (typeof this.waitQueue[cnt] === "function") {
    //       this.waitQueue[cnt](false);
    //     }
    //   }
    //   this.status = 0;
    //   this.waitQueue = [];
    // };
    // this.wss.onmessage = (mes) => {
    //   var buffer = new Uint8Array(mes.data);
    //   infoLog("on message:" + buffer);
    //   if (buffer[0] == 1) {
    //     this.receive(buffer);
    //   } else if (buffer[0] == 2) {
    //     this.onEvent(buffer);
    //   }
    // };
  }

  /**
   * GPIO データ送信処理
   * @param func 送信先アドレス
   * @param data 送信処理
   */
  send(func: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!(data instanceof Uint8Array)) {
        reject("type error: Please using with Uint8Array buffer.");
        return;
      }
      // var length = data.length + 4;
      // var buf = new Uint8Array(length);

      // buf[0] = 1; // 1: API Request
      // buf[1] = this.session & 0x00ff; // session LSB
      // buf[2] = this.session >> 8; // session MSB
      // buf[3] = func;

      // for (var cnt = 0; cnt < data.length; cnt++) {
      //   buf[4 + cnt] = data[cnt];
      // }
      // infoLog("send message:" + buf);
      // this.queue.set(this.session, (data) => {
      //   resolve(data);
      // });
      // this.wss.send(buf);
      // buf = null;
      // this.session++;
      // if (this.session > 0xffff) {
      //   this.session = 0;
      // }
    });
  }

  /**
   * GPIO データ受信処理
   * @param mes 受信メッセージ
   */
  receive(mes: any): void {
    // if (!(mes instanceof Uint8Array)) {
    //   errLog(new TypeError("Please using with Uint8Array buffer."));
    //   errLog(
    //     new TypeError(
    //       [
    //         "Uint8Array以外を受信しました。",
    //         "Node.jsのプロセスに何らかの内部的な問題が生じている可能性があります。",
    //       ].join(""),
    //     ),
    //   );
    //   return;
    // }
    // var session = (mes[1] & 0x00ff) | (mes[2] << 8);
    // var func = this.queue.get(session);
    // if (typeof func === "function") {
    //   infoLog("result");
    //   var data = new Array();
    //   for (var cnt = 0; cnt < mes.length - 4; cnt++) {
    //     data.push(mes[4 + cnt]);
    //   }
    //   func(data);
    //   this.queue.delete(session);
    // } else {
    //   errLog(new TypeError("session=" + session + " func=" + func));
    //   errLog(
    //     new TypeError(
    //       [
    //         "受信処理中に問題が発生しました。",
    //         "他のウィンドウ/タブなど別のプロセスと競合していないことを確認してください。",
    //       ].join(""),
    //     ),
    //   );
    // }
  }

  /**
   * GPIO イベント登録処理
   * @param f 登録アドレス
   * @param port ポート番号
   * @param func 登録バッファ
   */
  registerEvent(f: string, port: number, func: string): void {
    // var key = (f << 8) | port;
    // this.onevents.set(key, func);
  }

  /**
   * GPIO イベント削除処理
   * @param f 登録アドレス
   * @param port ポート番号
   */
  removeEvent(f: string, port: number): void {
    // var key = (f << 8) | port;
    // this.onevents.delete(key);
  }

  /**
   * GPIO イベント発生時処理
   * @param data データ
   */
  onEvent(data: any): void {
    // if (!(data instanceof Uint8Array)) {
    //   errLog(new TypeError("Please using with Uint8Array buffer."));
    //   errLog(
    //     new TypeError(
    //       [
    //         "Uint8Array以外を受信しました。",
    //         "Node.jsのプロセスに何らかの内部的な問題が生じている可能性があります。",
    //       ].join(""),
    //     ),
    //   );
    //   return;
    // }
    // // [0] Change Callback (2)
    // // [1] session id LSB (0)
    // // [2] session id MSB (0)
    // // [3] function id (0x14)
    // // [4] Port Number
    // // [5] Value (0:LOW 1:HIGH)
    // var key = data[3];
    // key = (key << 8) | data[4];
    // var func = this.onevents.get(key);
    // if (typeof func === "function") {
    //   infoLog("onevent");
    //   func(data);
    // }
  }

  /**
   * GPIO接続待ち処理
   */
  waitConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      // if (this.status == 2) {
      //   resolve();
      // } else if (this.status == 0) {
      //   reject();
      // } else {
      //   this.waitQueue.push((result) => {
      //     if (result == true) {
      //       resolve();
      //     } else {
      //       reject();
      //     }
      //   });
      // }
    });
  }
}
