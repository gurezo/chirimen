import { errLog } from "../logger";
import { WebSocketConnection } from "./websocket-connection";

type WaitQueueFunction = (result: boolean) => void;

export class WebSocketConnectionManager {
  private waitQueue: WaitQueueFunction[] = [];
  private connection: WebSocketConnection;

  constructor(serverURL: string) {
    this.connection = new WebSocketConnection(serverURL);
  }

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
  }

  public getConnection(): WebSocketConnection {
    return this.connection;
  }

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
