import { errLog } from "../logger";
import { WebSocketConnection } from "./websocket-connection";
import { WebSocketEventManager } from "./websocket-event-manager";
import { WebSocketMessageHandler } from "./websocket-message-handler";

type WaitQueueFunction = (result: boolean) => void;

export class WebSocketRouter {
  private waitQueue: WaitQueueFunction[] = [];
  private connection: WebSocketConnection;
  private messageHandler: WebSocketMessageHandler;
  private eventManager: WebSocketEventManager;

  constructor(serverURL: string) {
    this.connection = new WebSocketConnection(serverURL);
    this.messageHandler = new WebSocketMessageHandler();
    this.eventManager = new WebSocketEventManager();
  }

  /**
   * 初期化処理
   */
  public init(): void {
    this.connection.init();

    this.connection.setOnOpen(() => {
      for (const callback of this.waitQueue) {
        callback(true);
      }
      this.connection.setStatus(2);
      this.waitQueue = [];
    });

    this.connection.setOnError((error) => {
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
      this.connection.setStatus(0);
      this.waitQueue = [];
    });

    this.connection.setOnMessage((data) => {
      const buffer = new Uint8Array(data);
      if (buffer[0] === 1) {
        this.messageHandler.receive(buffer);
      } else if (buffer[0] === 2) {
        this.eventManager.handleEvent(buffer);
      }
    });
  }

  /**
   * データ送信処理
   * @param func 送信先アドレス
   * @param data 送信データ
   */
  public async send(func: number, data: Uint8Array): Promise<number[]> {
    const buf = await this.messageHandler.send(func, data);
    this.connection.send(new Uint8Array(buf).buffer);
    return buf;
  }

  /**
   * イベント登録処理
   * @param f 登録アドレス
   * @param port ポート番号
   * @param func 登録バッファ
   */
  public registerEvent(
    f: number,
    port: number,
    func: (data: number[]) => void,
  ): void {
    this.eventManager.registerEvent(f, port, func);
  }

  /**
   * イベント削除処理
   * @param f 登録アドレス
   * @param port ポート番号
   */
  public removeEvent(f: number, port: number): void {
    this.eventManager.removeEvent(f, port);
  }

  /**
   * 接続待ち処理
   */
  public waitConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      const status = this.connection.getStatus();
      if (status === 2) {
        resolve();
      } else if (status === 0) {
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
