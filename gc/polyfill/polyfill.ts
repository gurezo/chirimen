(() => {
  const serverURL = "wss://localhost:33330/";

  /**
   * ログ情報出力
   * @param str 出力文字列
   */
  function infoLog(str: any) {
    // console.log("info: "+str);
  }

  /**
   * エラーログログ情報出力
   * @param error エラー情報
   */
  function errLog(error: any) {
    console.error(error);
  }

  const bone = (() => {
    /**
     * router コンストラクターの関数, class 定義
     */
    function router() {}
    router.prototype = {
      wss: null,
      send: null,
      queue: null, // function queue
      onevents: null, // onevent queue
      waitQueue: null,
      status: 0, // 0: init 1: wait connection 2: connected
      session: 0,

      /**
       * @function
       * GPIO 初期化処理
       * @param serverURL WebSocket サーバーURL
       */
      init: (serverURL: any) => {
        infoLog("bone.init()");
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.waitQueue = new Array();
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.queue = new Map();
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.onevents = new Map();
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.wss = new WebSocket(serverURL);
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.wss.binaryType = "arraybuffer";
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.status = 1;
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.wss.onopen = () => {
          infoLog("onopen");
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          for (let cnt = 0; cnt < this.waitQueue.length; cnt++) {
            // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
            if (typeof this.waitQueue[cnt] === "function") {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              this.waitQueue[cnt](true);
            }
          }
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          this.status = 2;
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          this.waitQueue = [];
        };
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.wss.onerror = (error: any) => {
          errLog(error);
          errLog(
            [
              "Node.jsプロセスとの接続に失敗しました。",
              "CHIRIMEN for Raspberry Piやその互換環境でのみ実行可能です。",
              "https://r.chirimen.org/tutorial",
            ].join("\n")
          );
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          const length = this.waitQueue ? this.waitQueue.length : 0;
          for (let cnt = 0; cnt < length; cnt++) {
            // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
            if (typeof this.waitQueue[cnt] === "function") {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              this.waitQueue[cnt](false);
            }
          }
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          this.status = 0;
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          this.waitQueue = [];
        };
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.wss.onmessage = (mes: any) => {
          const buffer = new Uint8Array(mes.data);
          infoLog("on message:" + buffer);
          if (buffer[0] == 1) {
            // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
            this.receive(buffer);
          } else if (buffer[0] == 2) {
            // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
            this.onEvent(buffer);
          }
        };
      },

      /**
       * @function
       * GPIO データ送信処理
       * @param func 送信先アドレス
       * @param data 送信処理
       */
      // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
      send: (func: any, data: any) => {
        return new Promise((resolve, reject) => {
          if (!(data instanceof Uint8Array)) {
            reject("type error: Please using with Uint8Array buffer.");
            return;
          }
          const length = data.length + 4;
          let buf = new Uint8Array(length);

          buf[0] = 1; // 1: API Request
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          buf[1] = this.session & 0x00ff; // session LSB
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          buf[2] = this.session >> 8; // session MSB
          buf[3] = func;

          for (let cnt = 0; cnt < data.length; cnt++) {
            buf[4 + cnt] = data[cnt];
          }
          infoLog("send message:" + buf);
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          this.queue.set(this.session, (data: any) => {
            resolve(data);
          });
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          this.wss.send(buf);
          // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Uint8Array'... Remove this comment to see the full error message
          buf = null;
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          this.session++;
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          if (this.session > 0xffff) {
            // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
            this.session = 0;
          }
        });
      },

      /**
       * @function
       * GPIO データ受信処理
       * @param mes 受信メッセージ
       */
      receive: (mes: any) => {
        if (!(mes instanceof Uint8Array)) {
          errLog(new TypeError("Please using with Uint8Array buffer."));
          errLog(
            new TypeError(
              [
                "Uint8Array以外を受信しました。",
                "Node.jsのプロセスに何らかの内部的な問題が生じている可能性があります。",
              ].join("")
            )
          );
          return;
        }
        const session = (mes[1] & 0x00ff) | (mes[2] << 8);
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const func = this.queue.get(session);
        if (typeof func === "function") {
          infoLog("result");
          const data = new Array();
          for (let cnt = 0; cnt < mes.length - 4; cnt++) {
            data.push(mes[4 + cnt]);
          }
          func(data);
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          this.queue.delete(session);
        } else {
          errLog(new TypeError("session=" + session + " func=" + func));
          errLog(
            new TypeError(
              [
                "受信処理中に問題が発生しました。",
                "他のウィンドウ/タブなど別のプロセスと競合していないことを確認してください。",
              ].join("")
            )
          );
        }
      },

      /**
       * @function
       * GPIO イベント登録処理
       * @param f 登録アドレス
       * @param port ポート番号
       * @param func 登録バッファ
       */
      registerEvent: (f: any, port: any, func: any) => {
        const key = (f << 8) | port;
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.onevents.set(key, func);
      },

      /**
       * @function
       * GPIO イベント削除処理
       * @param f 登録アドレス
       * @param port ポート番号
       */
      removeEvent: (f: any, port: any) => {
        const key = (f << 8) | port;
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.onevents.delete(key);
      },

      /**
       * GPIO イベント発生時処理
       * @param data データ
       */
      onEvent: (data: any) => {
        if (!(data instanceof Uint8Array)) {
          errLog(new TypeError("Please using with Uint8Array buffer."));
          errLog(
            new TypeError(
              [
                "Uint8Array以外を受信しました。",
                "Node.jsのプロセスに何らかの内部的な問題が生じている可能性があります。",
              ].join("")
            )
          );
          return;
        }

        // [0] Change Callback (2)
        // [1] session id LSB (0)
        // [2] session id MSB (0)
        // [3] function id (0x14)
        // [4] Port Number
        // [5] Value (0:LOW 1:HIGH)
        let key = data[3];
        key = (key << 8) | data[4];

        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const func = this.onevents.get(key);
        if (typeof func === "function") {
          infoLog("onevent");
          func(data);
        }
      },

      /**
       * @function
       * GPIO接続待ち処理
       */
      waitConnection: () => {
        return new Promise((resolve, reject) => {
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          if (this.status == 2) {
            // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
            resolve();
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          } else if (this.status == 0) {
            reject();
          } else {
            // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
            this.waitQueue.push((result: any) => {
              if (result == true) {
                // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
                resolve();
              } else {
                reject();
              }
            });
          }
        });
      },
    };

    // @ts-expect-error TS(7009): 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
    const rt = new router();
    rt.init(serverURL);
    return rt;
  })();

  /**
   * GPIOAccess
   * Raspberry Pi GPIO Port Number
   *
   * TODO: add portName and pinName
   * */
  const gpioPorts = [
    4, 17, 18, 27, 22, 23, 24, 25, 5, 6, 12, 13, 19, 16, 26, 20, 21,
  ];

  /**
   * @function
   * GPIOAccess コンストラクターの関数の定義
   */
  const GPIOAccess = () => {
    // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
    this.init();
  };

  /**
   * GPIOAccess class 定義
   */
  GPIOAccess.prototype = {
    /**
     * @function
     * GPIOAccess 初期化処理
     * ポート情報マッピング
     */
    init: () => {
      // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
      this.ports = new Map();
      for (let cnt = 0; cnt < gpioPorts.length; cnt++) {
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.ports.set(gpioPorts[cnt], new GPIOPort(gpioPorts[cnt]));
      }
    },
    ports: new Map(),
    unexportAll: null,
    onchange: null,
  };

  /**
   * @function
   * GPIOPort 定義
   * @param portNumber ポート番号
   * ポート番号定義
   */
  const GPIOPort = (portNumber: any) => {
    infoLog("GPIOPort:" + portNumber);
    // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
    this.init(portNumber);
  };

  /**
   * GPIOPort 関数継承
   * ポート番号初期化
   */
  GPIOPort.prototype = {
    /**
     * @function
     * GPIO 初期化処理
     * @param portNumber ポート番号
     * ポート情報マッピング
     */
    init: (portNumber: any) => {
      // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
      this.portNumber = portNumber;
      // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
      this.portName = "";
      // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
      this.pinName = "";
      // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
      this.direction = "";
      // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
      this.exported = false;
      // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
      this.value = null;
      // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
      this.onchange = null;
    },

    /**
     * @function
     * GPIOポート接続処理
     * @param direction 入出力方向情報
     */
    export: (direction: any) => {
      return new Promise((resolve, reject) => {
        let dir = -1;
        if (direction === "out") {
          dir = 0;
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          bone.removeEvent(0x14, this.portNumber);
        } else if (direction === "in") {
          dir = 1;
          //        console.dir(bone);
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          bone.registerEvent(0x14, this.portNumber, (buf: any) => {
            // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
            if (typeof this.onchange === "function") {
              infoLog("onchange");
              // @ts-expect-error TS(2684): The 'this' context of type 'typeof globalThis' is ... Remove this comment to see the full error message
              this.onchange(buf[5]);
            }
          });
        } else {
          reject("export:direction not valid! [" + direction + "]");
        }
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        infoLog("export: Port:" + this.portNumber + " direction=" + direction);
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const data = new Uint8Array([this.portNumber, dir]);
        bone.send(0x10, data).then(
          (result: any) => {
            if (result[0] == 0) {
              errLog(
                [
                  `GPIO${                  
// @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
this.portNumber}への接続に失敗しました。`,
                  "他のウィンドウ/タブなど別のプロセスが既に同じピン番号を使用している可能性があります。",
                ].join("")
              );
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              reject("GPIOPort(" + this.portNumber + ").export() error");
            } else {
              // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
              resolve();
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },

    /**
     * @function
     * GPIO 読み取り処理
     */
    read: () => {
      return new Promise((resolve, reject) => {
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        infoLog("read: Port:" + this.portNumber);
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const data = new Uint8Array([this.portNumber]);
        bone.send(0x12, data).then(
          (result: any) => {
            if (result[0] == 0) {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              errLog(`GPIO${this.portNumber}から値の取得に失敗しました。`);
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              reject("GPIOPort(" + this.portNumber + ").read() error");
            } else {
              resolve(result[1]);
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },

    /**
     * @function
     * GPIO 書き込み処理
     * @param value 書き込みデータ
     */
    write: (value: any) => {
      return new Promise((resolve, reject) => {
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        infoLog("write: Port:" + this.portNumber + " value=" + value);
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const data = new Uint8Array([this.portNumber, value]);
        bone.send(0x11, data).then(
          (result: any) => {
            if (result[0] == 0) {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              errLog(`GPIO${this.portNumber}に値の設定に失敗しました。`);
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              reject("GPIOPort(" + this.portNumber + ").write() error");
            } else {
              // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
              resolve();
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },

    /**
     * @function
     * GPIO 状態変化処理
     */
    onchange: null,

    /**
     * @function
     * GPIOポート開放処理
     */
    unexport: () => {
      return new Promise((resolve, reject) => {
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        infoLog("unexport: Port:" + this.portNumber);
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const data = new Uint8Array([this.portNumber, value]);
        bone.send(0x13, data).then(
          (result: any) => {
            if (result[0] == 0) {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              errLog(`GPIO${this.portNumber}の開放に失敗しました。`);
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              reject("GPIOPort(" + this.portNumber + ").unexport() error");
            } else {
              // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
              resolve();
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },
  };

  //////////////////////////////////////////////////////////////////////////
  // I2CAccess

  const i2cPorts = [1];

  /**
   * @function
   *　I2C 読み込みエラー処理
   * @param portNumber ポート番号
   * @param slaveAddress スレーブアドレス
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  function printReadError(portNumber: any, slaveAddress: any) {
    errLog(
      [
        `i2c-${portNumber}(アドレス: 0x${slaveAddress.toString(16)})`,
        "からの値の取得に失敗しました。",
        "デバイスが正しく認識されており、アドレスに誤りがないことを確認してください。",
      ].join("")
    );
  }

  /**
   * @function
   *　I2C 書き込みエラー処理
   * @param portNumber ポート番号
   * @param slaveAddress スレーブアドレス
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  function printWriteError(portNumber: any, slaveAddress: any) {
    errLog(
      [
        `I2C-${portNumber}`,
        `(アドレス: 0x${slaveAddress.toString(16)})`,
        "への値の書き込みに失敗しました。",
        "デバイスが正しく認識されており、アドレスに誤りがないことを確認してください。",
      ].join(" ")
    );
  }

  /**
   * @function
   * I2CAccess コンストラクターの関数の定義
   */
  const I2CAccess = () => {
    // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
    this.init();
  };

  /**
   * @function
   * I2CAccess class 定義
   */
  I2CAccess.prototype = {
    /**
     * @function
     * I2CAccess 初期化処理
     * ポート情報マッピング
     */
    init: () => {
      // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
      this.ports = new Map();
      for (let cnt = 0; cnt < i2cPorts.length; cnt++) {
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.ports.set(i2cPorts[cnt], new I2CPort(i2cPorts[cnt]));
      }
    },
    ports: new Map(),
  };

  /**
   * @function
   * I2CPort 定義
   * @param portNumber ポート番号定義
   * ポート番号定義
   */
  function I2CPort(this: any, portNumber: any) {
    this.init(portNumber);
  }

  /**
   * I2CPort 関数継承
   * ポート番号初期化
   */
  I2CPort.prototype = {
    /**
     * @function
     * I2C 初期化処理
     * @param portNumber ポート番号
     * ポート情報マッピング
     */
    init: (portNumber: any) => {
      // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
      this.portNumber = portNumber;
    },

    portNumber: 0,

    /**
     * @function
     * I2C ポート open 処理
     * @param slaveAddress スレーブアドレス
     */
    open: (slaveAddress: any) => {
      return new Promise((resolve, reject) => {
        // @ts-expect-error TS(7009): 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
        new I2CSlaveDevice(this.portNumber, slaveAddress).then(
          (i2cslave: any) => {
            resolve(i2cslave);
          },
          (err: any) => {
            reject(err);
          }
        );
      });
    },
  };

  /**
   * @function
   *　I2CSlaveDevice コンストラクターの関数の定義
   * @param portNumber ポート番号
   * @param slaveAddress スレーブアドレス
   * @return ポート、デバイス初期化結果
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  function I2CSlaveDevice(this: any, portNumber: any, slaveAddress: any) {
    return new Promise((resolve, reject) => {
      this.init(portNumber, slaveAddress).then(
        () => {
          resolve(this);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
  }

  /**
   * @function
   * I2CSlaveDevice class 定義
   * @param portNumber ポート番号
   * @param slaveAddress スレーブアドレス
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  I2CSlaveDevice.prototype = {
    portNumber: null,
    slaveAddress: null,
    slaveDevice: null,

    /**
     * @function
     *　I2C スレーブデバイス初期化処理
     * @param portNumber ポート番号
     * @param slaveAddress スレーブアドレス
     * @return ポート、デバイス初期化結果
     * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
     */
    init: (portNumber: any, slaveAddress: any) => {
      return new Promise((resolve, reject) => {
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.portNumber = portNumber;
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        this.slaveAddress = slaveAddress;
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const data = new Uint8Array([this.slaveAddress, 1]);
        bone.send(0x20, data).then(
          (result: any) => {
            if (result[0] != 0) {
              infoLog("I2CSlaveDevice.init() result OK");
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              resolve(this);
            } else {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              errLog(`I2C-${this.portNumber}への接続に失敗しました。`);
              errLog("I2CSlaveDevice.init() result NG");
              reject("I2CSlaveDevice.init() result NG:");
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },

    /**
     * @function
     *　I2C 8bit 読み込み処理
     * @param registerNumber 読み込み番号
     * @return 読み込み結果
     * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
     */
    read8: (registerNumber: any) => {
      return new Promise((resolve, reject) => {
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const data = new Uint8Array([this.slaveAddress, registerNumber, 1]);
        bone.send(0x23, data).then(
          (result: any) => {
            infoLog("I2CSlaveDevice.read8() result value=" + result);
            const readSize = result[0];
            if (readSize == 1) {
              resolve(result[1]);
            } else {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              printReadError(this.portNumber, this.slaveAddress);
              reject("read8() readSize unmatch : " + readSize);
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },

    /**
     * @function
     *　I2C 16bit 読み込み処理
     * @param registerNumber 読み込み番号
     * @return 読み込み結果
     * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
     */
    read16: (registerNumber: any) => {
      return new Promise((resolve, reject) => {
        infoLog("I2CSlaveDevice.read16() registerNumber=" + registerNumber);
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const data = new Uint8Array([this.slaveAddress, registerNumber, 2]);
        bone.send(0x23, data).then(
          (result: any) => {
            infoLog("I2CSlaveDevice.write8() result value=" + result);
            const readSize = result[0];
            if (readSize == 2) {
              const res_l = result[1];
              const res_h = result[2];
              const res = res_l + (res_h << 8);
              resolve(res);
            } else {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              printReadError(this.portNumber, this.slaveAddress);
              reject("read16() readSize unmatch : " + readSize);
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },

    /**
     * @function
     *　I2C 8bit 書き込み処理
     * @param registerNumber 書き込み番号
     * @param value 書き込み値
     * @return 書き込み結果
     * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
     */
    write8: (registerNumber: any, value: any) => {
      return new Promise((resolve, reject) => {
        infoLog(
          "I2CSlaveDevice.write8() registerNumber=" + registerNumber,
          // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
          " value=" + value
        );
        const size = 2;
        const data = new Uint8Array([
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          this.slaveAddress,
          size,
          registerNumber,
          value,
        ]);
        bone.send(0x21, data).then(
          (result: any) => {
            infoLog("I2CSlaveDevice.write8() result value=" + result);
            if (result[0] != size) {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              printWriteError(this.portNumber, this.slaveAddress);
              reject(
                // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
                "I2CSlaveAddress(" + this.slaveAddress + ").write8():error"
              );
            } else {
              // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
              resolve();
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },

    /**
     * @function
     *　I2C 16bit 書き込み処理
     * @param registerNumber 書き込み番号
     * @param value 書き込み値
     * @return 書き込み結果
     * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
     */
    write16: (registerNumber: any, value: any) => {
      return new Promise((resolve, reject) => {
        infoLog(
          "I2CSlaveDevice.write16() registerNumber=" + registerNumber,
          // @ts-expect-error TS(2554): Expected 1 arguments, but got 2.
          " value=" + value
        );
        const value_L = value & 0x00ff;
        const value_H = (value >> 8) & 0x00ff;
        const size = 3;
        const data = new Uint8Array([
          // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
          this.slaveAddress,
          size,
          registerNumber,
          value_L,
          value_H,
        ]);
        bone.send(0x21, data).then(
          (result: any) => {
            infoLog("I2CSlaveDevice.write16() result value=" + result);
            if (result[0] != size) {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              printWriteError(this.portNumber, this.slaveAddress);
              reject(
                // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
                "I2CSlaveAddress(" + this.slaveAddress + ").write16():error"
              );
            } else {
              // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
              resolve();
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },

    /**
     * @function
     *　I2C 1byte 読み込み処理
     * @return 読み込み結果
     * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
     */
    readByte: () => {
      return new Promise((resolve, reject) => {
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const data = new Uint8Array([this.slaveAddress, 1]);
        bone.send(0x22, data).then(
          (result: any) => {
            infoLog("I2CSlaveDevice.readByte() result value=" + result);
            const readSize = result[0];
            if (readSize == 1) {
              resolve(result[1]);
            } else {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              printReadError(this.portNumber, this.slaveAddress);
              reject("readByte() readSize unmatch : " + readSize);
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },

    /**
     * @function
     *　I2C n byte 読み込み処理
     * @param length 読み込みバイト長
     * @return 読み込み結果
     * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
     */
    readBytes: (length: any) => {
      return new Promise((resolve, reject) => {
        if (typeof length !== "number" || length > 127) {
          reject("readBytes() readSize error : " + length);
        }
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const data = new Uint8Array([this.slaveAddress, length]);
        bone.send(0x22, data).then(
          (result: any) => {
            infoLog("I2CSlaveDevice.readBytes() result value=" + result);
            const readSize = result[0];
            if (readSize == length) {
              let buffer = result;
              buffer.shift(); // readSizeを削除
              resolve(buffer);
            } else {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              printReadError(this.portNumber, this.slaveAddress);
              reject("readBytes() readSize unmatch : " + readSize);
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },

    /**
     * @function
     *　I2C 1byte 書き込み処理
     * @param value 書き込み値
     * @return 書き込み結果
     * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
     */
    writeByte: (value: any) => {
      return new Promise((resolve, reject) => {
        infoLog("I2CSlaveDevice.writeByte() value=" + value);
        const size = 1;
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const data = new Uint8Array([this.slaveAddress, size, value]);
        bone.send(0x21, data).then(
          (result: any) => {
            infoLog("I2CSlaveDevice.writeByte() result" + result);
            if (result[0] != size) {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              printWriteError(this.portNumber, this.slaveAddress);
              reject(
                // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
                "I2CSlaveAddress(" + this.slaveAddress + ").writeByte():error"
              );
            } else {
              // @ts-expect-error TS(2794): Expected 1 arguments, but got 0. Did you forget to... Remove this comment to see the full error message
              resolve();
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },

    /**
     * @function
     *　I2C n byte 書き込み処理
     * @param buffer 書き込み値
     * @return 書き込み結果
     * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
     */
    writeBytes: (buffer: any) => {
      return new Promise((resolve, reject) => {
        if (buffer.length == null) {
          reject("readBytes() parameter error : " + buffer);
        }
        // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
        const arr = [this.slaveAddress, buffer.length];
        for (let cnt = 0; cnt < buffer.length; cnt++) {
          arr.push(buffer[cnt]);
        }
        const data = new Uint8Array(arr);
        bone.send(0x21, data).then(
          (result: any) => {
            infoLog("I2CSlaveDevice.writeBytes() result value=" + result);
            if (result[0] == buffer.length) {
              const resbuffer = result;
              resbuffer.shift(); // readSizeを削除
              resolve(resbuffer);
            } else {
              // @ts-expect-error TS(7041): The containing arrow function captures the global ... Remove this comment to see the full error message
              printWriteError(this.portNumber, this.slaveAddress);
              reject("writeBytes() writeSize unmatch : " + result[0]);
            }
          },
          (error: any) => {
            reject(error);
          }
        );
      });
    },
  };

  //////////////////////////////////////////////////////////////////////////
  // navigator

  // @ts-expect-error TS(2551): Property 'requestI2CAccess' does not exist on type... Remove this comment to see the full error message
  if (!navigator.requestI2CAccess) {
    /**
     * @function
     *　navigator requestI2CAccess 割当処理
     * @return 割当結果
     */
    // @ts-expect-error TS(2551): Property 'requestI2CAccess' does not exist on type... Remove this comment to see the full error message
    navigator.requestI2CAccess = () => {
      return new Promise((resolve, reject) => {
        //      console.dir(bone);
        bone
          .waitConnection()
          .then(() => {
            // @ts-expect-error TS(7009): 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
            const i2cAccess = new I2CAccess();
            infoLog("I2CAccess.resolve");
            resolve(i2cAccess);
          })
          .catch((e: any) => {
            reject(e);
          });
      });
    };
  }

  // @ts-expect-error TS(2551): Property 'requestGPIOAccess' does not exist on typ... Remove this comment to see the full error message
  if (!navigator.requestGPIOAccess) {
    /**
     * @function
     *　navigator requestGPIOAccess 割当処理
     * @return 割当結果
     */
    // @ts-expect-error TS(2551): Property 'requestGPIOAccess' does not exist on typ... Remove this comment to see the full error message
    navigator.requestGPIOAccess = () => {
      return new Promise((resolve, reject) => {
        //      console.dir(bone);
        bone
          .waitConnection()
          .then(() => {
            // @ts-expect-error TS(7009): 'new' expression, whose target lacks a construct s... Remove this comment to see the full error message
            const gpioAccess = new GPIOAccess();
            infoLog("gpioAccess.resolve");
            resolve(gpioAccess);
          })
          .catch((e: any) => {
            reject(e);
          });
      });
    };
  }
})();

//////////////////////////////////////////////////////////////////////////
// common utility functions

/**
 * Utility function for async/await code.
 * @param {number} ms - milliseconds to wait
 * @return {Promise} A promise to be resolved after ms milliseconds later.
 */
function sleep(ms: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
