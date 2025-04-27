/**
 * 指定されたミリ秒間スリープする
 * @param ms スリープするミリ秒
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * エラーメッセージを出力する
 * @param portNumber ポート番号
 * @param slaveAddress スレーブアドレス
 */
export function printReadError(portNumber: number, slaveAddress: number): void {
  console.error(
    [
      `I2C Read Error: Port=${portNumber} Address=0x${slaveAddress.toString(16)}`,
      "デバイスが接続されていないか、アドレスが間違っている可能性があります。",
      "配線やデバイスの接続を確認してください。",
    ].join("\n"),
  );
}

/**
 * エラーメッセージを出力する
 * @param portNumber ポート番号
 * @param slaveAddress スレーブアドレス
 */
export function printWriteError(
  portNumber: number,
  slaveAddress: number,
): void {
  console.error(
    [
      `I2C Write Error: Port=${portNumber} Address=0x${slaveAddress.toString(16)}`,
      "デバイスが接続されていないか、アドレスが間違っている可能性があります。",
      "配線やデバイスの接続を確認してください。",
    ].join("\n"),
  );
}
