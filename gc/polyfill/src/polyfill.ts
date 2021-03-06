import { GPIOAccess } from './GPIOAccess';
import { I2CAccess } from './I2CAccess';
import { I2CPort } from './I2CPort';

/**
 * Utility function for async/await code.
 * @param {number} ms - milliseconds to wait
 * @return {Promise} A promise to be resolved after ms milliseconds later.
 */
function sleep(ms: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

/**
 * ログ情報出力
 * @param {*} str 出力文字列
 */
  function infoLog(str: string) {
  // console.log("info: "+str);
}

/**
 * エラーログログ情報出力
 * @param {*} error エラー情報
 */
function errLog(error: any) {
  console.error(error);
}

(() => {
  const serverURL = "wss://localhost:33330/";

  const _GPIOAccess = new GPIOAccess(); 
  const _I2CAccess = new I2CAccess(); 
  const _I2CPort = new I2CPort(); 



})();
