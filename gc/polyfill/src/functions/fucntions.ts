/**
 * ログ情報出力
 * @param str 出力文字列
 */
export function infoLog(str: string): void {
  console.log("info: " + str);
}

/**
 * エラーログログ情報出力
 * @param error エラー情報
 */
export function errLog(error: any): void {
  console.error(error);
}

/**
 * Utility function for async/await code.
 * @param {number} ms - milliseconds to wait
 * @return {Promise} A promise to be resolved after ms milliseconds later.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
