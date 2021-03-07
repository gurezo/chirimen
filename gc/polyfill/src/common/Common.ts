/**
 * Utility function for async/await code.
 * @param {number} ms - milliseconds to wait
 * @return {Promise} A promise to be resolved after ms milliseconds later.
 */
export function sleep(ms: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

/**
 * ログ情報出力
 * @param {*} str 出力文字列
 */
 export function infoLog(str: string) {
  // console.log("info: "+str);
}

/**
 * エラーログログ情報出力
 * @param {*} error エラー情報
 */
export function errLog(error: any) {
  console.error(error);
}
