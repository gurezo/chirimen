import { errLog, infoLog } from "../functions";

export class I2CSlaveDevice {
  portNumber: any = null;
  slaveAddress: any = null;
  slaveDevice: any = null;

  constructor(portNumber: number, slaveAddress: any) {
    this.portNumber = null;
    this.slaveAddress = null;
    this.slaveDevice = null;
    this.init(portNumber, slaveAddress);
  }

  /**
   *　I2C 読み込みエラー処理
   * @param portNumber ポート番号
   * @param slaveAddress スレーブアドレス
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  printReadError(portNumber: number, slaveAddress: any): void {
    errLog(
      [
        `i2c-${portNumber}(アドレス: 0x${slaveAddress.toString(16)})`,
        "からの値の取得に失敗しました。",
        "デバイスが正しく認識されており、アドレスに誤りがないことを確認してください。",
      ].join(""),
    );
  }

  /**
   *　I2C 書き込みエラー処理
   * @param portNumber ポート番号
   * @param slaveAddress スレーブアドレス
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  printWriteError(portNumber: number, slaveAddress: any): void {
    errLog(
      [
        `I2C-${portNumber}`,
        `(アドレス: 0x${slaveAddress.toString(16)})`,
        "への値の書き込みに失敗しました。",
        "デバイスが正しく認識されており、アドレスに誤りがないことを確認してください。",
      ].join(" "),
    );
  }

  /**
   *　I2C スレーブデバイス初期化処理
   * @param portNumber ポート番号
   * @param slaveAddress スレーブアドレス
   * @return ポート、デバイス初期化結果
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  init(portNumber: number, slaveAddress: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.portNumber = portNumber;
      this.slaveAddress = slaveAddress;
      // var data = new Uint8Array([this.slaveAddress, 1]);
      // bone.send(0x20, data).then(
      //   (result) => {
      //     if (result[0] != 0) {
      //       infoLog("I2CSlaveDevice.init() result OK");
      //       resolve(this);
      //     } else {
      //       errLog(`I2C-${this.portNumber}への接続に失敗しました。`);
      //       errLog("I2CSlaveDevice.init() result NG");
      //       reject("I2CSlaveDevice.init() result NG:");
      //     }
      //   },
      //   (error) => {
      //     reject(error);
      //   },
      // );
    });
  }

  /**
   *　I2C 8bit 読み込み処理
   * @param registerNumber 読み込み番号
   * @return 読み込み結果
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  read8(registerNumber: number): Promise<void> {
    return new Promise((resolve, reject) => {
      // var data = new Uint8Array([this.slaveAddress, registerNumber, 1]);
      // bone.send(0x23, data).then(
      //   (result) => {
      //     infoLog("I2CSlaveDevice.read8() result value=" + result);
      //     var readSize = result[0];
      //     if (readSize == 1) {
      //       resolve(result[1]);
      //     } else {
      //       printReadError(this.portNumber, this.slaveAddress);
      //       reject("read8() readSize unmatch : " + readSize);
      //     }
      //   },
      //   (error) => {
      //     reject(error);
      //   },
      // );
    });
  }

  /**
   *　I2C 16bit 読み込み処理
   * @param registerNumber 読み込み番号
   * @return 読み込み結果
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  read16(registerNumber: number): Promise<void> {
    return new Promise((resolve, reject) => {
      infoLog("I2CSlaveDevice.read16() registerNumber=" + registerNumber);
      // var data = new Uint8Array([this.slaveAddress, registerNumber, 2]);
      // bone.send(0x23, data).then(
      //   (result) => {
      //     infoLog("I2CSlaveDevice.write8() result value=" + result);
      //     var readSize = result[0];
      //     if (readSize == 2) {
      //       var res_l = result[1];
      //       var res_h = result[2];
      //       var res = res_l + (res_h << 8);
      //       resolve(res);
      //     } else {
      //       printReadError(this.portNumber, this.slaveAddress);
      //       reject("read16() readSize unmatch : " + readSize);
      //     }
      //   },
      //   (error) => {
      //     reject(error);
      //   },
      // );
    });
  }

  /**
   *　I2C 8bit 書き込み処理
   * @param registerNumber 書き込み番号
   * @param value 書き込み値
   * @return 書き込み結果
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  write8(registerNumber: number, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      infoLog(
        "I2CSlaveDevice.write8() registerNumber=" +
          registerNumber +
          " value=" +
          value,
      );
      // var size = 2;
      // var data = new Uint8Array([
      //   this.slaveAddress,
      //   size,
      //   registerNumber,
      //   value,
      // ]);
      // bone.send(0x21, data).then(
      //   (result) => {
      //     infoLog("I2CSlaveDevice.write8() result value=" + result);
      //     if (result[0] != size) {
      //       printWriteError(this.portNumber, this.slaveAddress);
      //       reject("I2CSlaveAddress(" + this.slaveAddress + ").write8():error");
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
   *　I2C 16bit 書き込み処理
   * @param registerNumber 書き込み番号
   * @param value 書き込み値
   * @return 書き込み結果
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  write16(registerNumber: number, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      infoLog(
        "I2CSlaveDevice.write16() registerNumber=" +
          registerNumber +
          " value=" +
          value,
      );
      var value_L = value & 0x00ff;
      var value_H = (value >> 8) & 0x00ff;
      var size = 3;
      var data = new Uint8Array([
        this.slaveAddress,
        size,
        registerNumber,
        value_L,
        value_H,
      ]);
      // bone.send(0x21, data).then(
      //   (result) => {
      //     infoLog("I2CSlaveDevice.write16() result value=" + result);
      //     if (result[0] != size) {
      //       printWriteError(this.portNumber, this.slaveAddress);
      //       reject(
      //         "I2CSlaveAddress(" + this.slaveAddress + ").write16():error",
      //       );
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
   *　I2C 1byte 読み込み処理
   * @return 読み込み結果
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  readByte(): Promise<void> {
    return new Promise((resolve, reject) => {
      // var data = new Uint8Array([this.slaveAddress, 1]);
      // bone.send(0x22, data).then(
      //   (result) => {
      //     infoLog("I2CSlaveDevice.readByte() result value=" + result);
      //     var readSize = result[0];
      //     if (readSize == 1) {
      //       resolve(result[1]);
      //     } else {
      //       printReadError(this.portNumber, this.slaveAddress);
      //       reject("readByte() readSize unmatch : " + readSize);
      //     }
      //   },
      //   (error) => {
      //     reject(error);
      //   },
      // );
    });
  }

  /**
   *　I2C n byte 読み込み処理
   * @param length 読み込みバイト長
   * @return 読み込み結果
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  readBytes(length: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof length !== "number" || length > 127) {
        reject("readBytes() readSize error : " + length);
      }
      // var data = new Uint8Array([this.slaveAddress, length]);
      // bone.send(0x22, data).then(
      //   (result) => {
      //     infoLog("I2CSlaveDevice.readBytes() result value=" + result);
      //     var readSize = result[0];
      //     if (readSize == length) {
      //       var buffer = result;
      //       buffer.shift(); // readSizeを削除
      //       resolve(buffer);
      //     } else {
      //       printReadError(this.portNumber, this.slaveAddress);
      //       reject("readBytes() readSize unmatch : " + readSize);
      //     }
      //   },
      //   (error) => {
      //     reject(error);
      //   },
      // );
    });
  }

  /**
   *　I2C 1byte 書き込み処理
   * @param value 書き込み値
   * @return 書き込み結果
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  writeByte(value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      infoLog("I2CSlaveDevice.writeByte() value=" + value);
      var size = 1;
      var data = new Uint8Array([this.slaveAddress, size, value]);
      // bone.send(0x21, data).then(
      //   (result) => {
      //     infoLog("I2CSlaveDevice.writeByte() result" + result);
      //     if (result[0] != size) {
      //       printWriteError(this.portNumber, this.slaveAddress);
      //       reject(
      //         "I2CSlaveAddress(" + this.slaveAddress + ").writeByte():error",
      //       );
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
   *　I2C n byte 書き込み処理
   * @param buffer 書き込み値
   * @return 書き込み結果
   * TODO: master-slave => main-sub になっているので、いずれ変えるべき？
   */
  writeBytes(buffer: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (buffer.length == null) {
        reject("readBytes() parameter error : " + buffer);
      }
      var arr = [this.slaveAddress, buffer.length];
      for (var cnt = 0; cnt < buffer.length; cnt++) {
        arr.push(buffer[cnt]);
      }
      var data = new Uint8Array(arr);
      // bone.send(0x21, data).then(
      //   (result) => {
      //     infoLog("I2CSlaveDevice.writeBytes() result value=" + result);
      //     if (result[0] == buffer.length) {
      //       var resbuffer = result;
      //       resbuffer.shift(); // readSizeを削除
      //       resolve(resbuffer);
      //     } else {
      //       printWriteError(this.portNumber, this.slaveAddress);
      //       reject("writeBytes() writeSize unmatch : " + result[0]);
      //     }
      //   },
      //   (error) => {
      //     reject(error);
      //   },
      // );
    });
  }
}
