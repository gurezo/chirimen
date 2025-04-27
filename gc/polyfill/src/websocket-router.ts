import { errLog, infoLog } from "./logger";

type CallbackFunction = (data: number[]) => void;
type WaitQueueFunction = (result: boolean) => void;

export class WebSocketRouter {
  private wss: WebSocket | null = null;
  private queue: Map<number, CallbackFunction> = new Map();
  private onevents: Map<number, CallbackFunction> = new Map();
  private waitQueue: WaitQueueFunction[] = [];
  private status: number = 0; // 0: init 1: wait connection 2: connected
  private session: number = 0;

  constructor(private serverURL: string) {}

  /**
   * GPIO 初期化処理
   */
  public init(): void {
    infoLog("bone.init()");
    this.waitQueue = [];
    this.queue = new Map();
    this.onevents = new Map();
    this.wss = new WebSocket(this.serverURL);
    this.wss.binaryType = "arraybuffer";
    this.status = 1;

    this.wss.onopen = () => {
      infoLog("onopen");
      for (const callback of this.waitQueue) {
        callback(true);
      }
      this.status = 2;
      this.waitQueue = [];
    };

    this.wss.onerror = (error) => {
      errLog(error.toString());
      errLog(
        [
          "Node.jsプロセスとの接続に失敗しました。",
          "CHIRIMEN for Raspberry Piやその互換環境でのみ実行可能です。",
          "https://r.chirimen.org/tutorial",
        ].join("\n"),
      );

      for (const callback of this.waitQueue) {
        callback(false);
      }
      this.status = 0;
      this.waitQueue = [];
    };

    this.wss.onmessage = (mes) => {
      const buffer = new Uint8Array(mes.data);
      infoLog("on message:" + buffer);
      if (buffer[0] === 1) {
        this.receive(buffer);
      } else if (buffer[0] === 2) {
        this.onEvent(buffer);
      }
    };
  }

  /**
   * GPIO データ送信処理
   * @param func 送信先アドレス
   * @param data 送信データ
   */
  public send(func: number, data: Uint8Array): Promise<number[]> {
    return new Promise((resolve, reject) => {
      if (!(data instanceof Uint8Array)) {
        reject(new Error("type error: Please using with Uint8Array buffer."));
        return;
      }

      const length = data.length + 4;
      const buf = new Uint8Array(length);

      buf[0] = 1; // 1: API Request
      buf[1] = this.session & 0x00ff; // session LSB
      buf[2] = this.session >> 8; // session MSB
      buf[3] = func;

      for (let cnt = 0; cnt < data.length; cnt++) {
        buf[4 + cnt] = data[cnt];
      }

      infoLog("send message:" + buf);
      this.queue.set(this.session, (data) => {
        resolve(data);
      });

      if (this.wss) {
        this.wss.send(buf);
      }

      this.session++;
      if (this.session > 0xffff) {
        this.session = 0;
      }
    });
  }

  /**
   * GPIO データ受信処理
   * @param mes 受信メッセージ
   */
  private receive(mes: Uint8Array): void {
    if (!(mes instanceof Uint8Array)) {
      errLog(new TypeError("Please using with Uint8Array buffer."));
      errLog(
        new TypeError(
          [
            "Uint8Array以外を受信しました。",
            "Node.jsのプロセスに何らかの内部的な問題が生じている可能性があります。",
          ].join(""),
        ),
      );
      return;
    }

    const session = (mes[1] & 0x00ff) | (mes[2] << 8);
    const func = this.queue.get(session);

    if (typeof func === "function") {
      infoLog("result");
      const data: number[] = [];
      for (let cnt = 0; cnt < mes.length - 4; cnt++) {
        data.push(mes[4 + cnt]);
      }
      func(data);
      this.queue.delete(session);
    } else {
      errLog(new TypeError(`session=${session} func=${func}`));
      errLog(
        new TypeError(
          [
            "受信処理中に問題が発生しました。",
            "他のウィンドウ/タブなど別のプロセスと競合していないことを確認してください。",
          ].join(""),
        ),
      );
    }
  }

  /**
   * GPIO イベント登録処理
   * @param f 登録アドレス
   * @param port ポート番号
   * @param func 登録バッファ
   */
  public registerEvent(f: number, port: number, func: CallbackFunction): void {
    const key = (f << 8) | port;
    this.onevents.set(key, func);
  }

  /**
   * GPIO イベント削除処理
   * @param f 登録アドレス
   * @param port ポート番号
   */
  public removeEvent(f: number, port: number): void {
    const key = (f << 8) | port;
    this.onevents.delete(key);
  }

  /**
   * GPIO イベント発生時処理
   * @param data データ
   */
  private onEvent(data: Uint8Array): void {
    if (!(data instanceof Uint8Array)) {
      errLog(new TypeError("Please using with Uint8Array buffer."));
      errLog(
        new TypeError(
          [
            "Uint8Array以外を受信しました。",
            "Node.jsのプロセスに何らかの内部的な問題が生じている可能性があります。",
          ].join(""),
        ),
      );
      return;
    }

    const key = (data[3] << 8) | data[4];
    const func = this.onevents.get(key);

    if (typeof func === "function") {
      infoLog("onevent");
      func(Array.from(data));
    }
  }

  /**
   * GPIO接続待ち処理
   */
  public waitConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.status === 2) {
        resolve();
      } else if (this.status === 0) {
        reject();
      } else {
        this.waitQueue.push((result) => {
          if (result === true) {
            resolve();
          } else {
            reject();
          }
        });
      }
    });
  }
}
