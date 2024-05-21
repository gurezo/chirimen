## polyfill.js コード構造

### router

- router コンストラクターの関数, class 定義
  - GPIO 初期化処理
    - @param serverURL WebSocket サーバーURL
  - GPIO データ送信処理
    - @param func 送信先アドレス
    - @param data 送信処理
  - GPIO データ受信処理
    - @param mes 受信メッセージ
  - GPIO イベント登録処理
    - @param f 登録アドレス
    - @param port ポート番号
    - @param func 登録バッファ
  - GPIO イベント削除処理
    - @param f 登録アドレス
    - @param port ポート番号
  - GPIO イベント発生時処理
    - @param data データ
  - GPIO接続待ち処理

### GPIO

### GPIOAccess

- GPIOAccess
- Raspberry Pi GPIO Port Number
- GPIOAccess コンストラクターの関数の定義
- GPIOAccess class 定義
- GPIOPort 定義
- ポート番号定義
- GPIOPort 関数継承
- ポート番号初期化
  - GPIO 初期化処理
    - @param portNumber ポート番号
  - ポート情報マッピング
  - GPIOポート接続処理
    - @param direction 入出力方向情報
  - GPIO 読み取り処理
  - GPIO 書き込み処理
    - @param value 書き込みデータ
  - GPIO 状態変化処理
  - GPIOポート開放処理

### I2C

### I2CAccess

- I2C 読み込みエラー処理
- @param portNumber ポート番号
- @param slaveAddress スレーブアドレス
- I2C 書き込みエラー処理
- @param portNumber ポート番号
- @param slaveAddress スレーブアドレス
- I2CAccess コンストラクターの関数の定義
- I2CAccess class 定義
  - I2CAccess 初期化処理
  - ポート情報マッピング
- I2CPort 定義
- @param portNumber ポート番号定義
- I2CPort 関数継承
- ポート番号初期化
  - I2C 初期化処理
    - @param portNumber ポート番号
  - I2C ポート open 処理
    - @param slaveAddress スレーブアドレス
- I2CSlaveDevice コンストラクターの関数の定義
- @param portNumber ポート番号
- @param slaveAddress スレーブアドレス
- @return ポート、デバイス初期化結果
- I2CSlaveDevice class 定義
- @param portNumber ポート番号
- @param slaveAddress スレーブアドレス
  - I2C スレーブデバイス初期化処理
    - @param portNumber ポート番号
    - @param slaveAddress スレーブアドレス
  - @return ポート、デバイス初期化結果
  - I2C 8bit 読み込み処理
    - @param registerNumber 読み込み番号
  - @return 読み込み結果
  - I2C 16bit 読み込み処理
    - @param registerNumber 読み込み番号
  - @return 読み込み結果
  - I2C 8bit 書き込み処理
    - @param registerNumber 書き込み番号
    - @param value 書き込み値
  - @return 書き込み結果
  - I2C 16bit 書き込み処理
    - @param registerNumber 書き込み番号
    - @param value 書き込み値
  - @return 書き込み結果
  - I2C 1byte 読み込み処理
  - @return 読み込み結果
  - I2C n byte 読み込み処理
    - @param length 読み込みバイト長
  - @return 読み込み結果
  - I2C 1byte 書き込み処理
    - @param value 書き込み値
  - @return 書き込み結果
  - I2C n byte 書き込み処理
    - @param buffer 書き込み値
  - @return 書き込み結果

### navigator

- navigator requestI2CAccess 割当処理
  - @return 割当結果
- navigator requestGPIOAccess 割当処理
  - @return 割当結果
