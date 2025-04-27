import { WebSocketConnectionManager } from "./websocket-connection-manager";
import { WebSocketEventManager } from "./websocket-event-manager";
import { WebSocketMessageRouter } from "./websocket-message-router";

export class WebSocketRouter {
  private connectionManager: WebSocketConnectionManager;
  private messageRouter: WebSocketMessageRouter;
  private eventManager: WebSocketEventManager;

  constructor(serverURL: string) {
    this.connectionManager = new WebSocketConnectionManager(serverURL);
    this.messageRouter = new WebSocketMessageRouter(
      this.connectionManager.getConnection(),
    );
    this.eventManager = new WebSocketEventManager();
  }

  /**
   * 初期化処理
   */
  public init(): void {
    this.connectionManager.init();
    this.connectionManager.getConnection().setOnMessage((data) => {
      const buffer = new Uint8Array(data);
      if (buffer[0] === 1) {
        this.messageRouter.handleMessage(data);
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
    return this.messageRouter.send(func, data);
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
    return this.connectionManager.waitConnection();
  }
}
