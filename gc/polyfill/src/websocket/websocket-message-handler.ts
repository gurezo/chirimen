import { errLog, infoLog } from "../logger";

type CallbackFunction = (data: number[]) => void;

export class WebSocketMessageHandler {
  private queue: Map<number, CallbackFunction> = new Map();
  private session: number = 0;

  public async send(func: number, data: Uint8Array): Promise<number[]> {
    if (!(data instanceof Uint8Array)) {
      throw new Error("type error: Please using with Uint8Array buffer.");
    }

    const length = data.length + 4;
    const buf = new Uint8Array(length);

    buf[0] = 1;
    buf[1] = this.session & 0x00ff;
    buf[2] = this.session >> 8;
    buf[3] = func;

    for (let cnt = 0; cnt < data.length; cnt++) {
      buf[4 + cnt] = data[cnt];
    }

    infoLog("send message:" + buf);
    this.queue.set(this.session, (data) => {
      return data;
    });

    this.session++;
    if (this.session > 0xffff) {
      this.session = 0;
    }

    return Array.from(buf);
  }

  public receive(mes: Uint8Array): void {
    if (!(mes instanceof Uint8Array)) {
      errLog(new TypeError("Please using with Uint8Array buffer."));
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
    }
  }
}
