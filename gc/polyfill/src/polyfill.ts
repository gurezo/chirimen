import { GPIOAccess } from './gpio/GPIOAccess';
import { I2CAccess } from './i2c/I2CAccess';

import { Route } from './route/Route';

import { errLog, infoLog, sleep } from './common/Common';

declare var navigator: any;

(() => {
  const serverURL = "wss://localhost:33330/";

  const bone = new Route(serverURL);


  if (!navigator.requestI2CAccess) {
    /**
     * @function
     *　navigator requestI2CAccess 割当処理
     * @return {*} 割当結果
     */
    navigator.requestI2CAccess = function () {
      return new Promise(function (resolve, reject) {
        //      console.dir(bone);
        bone
          .waitConnection()
          .then(() => {
            var i2cAccess = new I2CAccess();
            infoLog("I2CAccess.resolve");
            resolve(i2cAccess);
          })
          .catch((e) => {
            reject(e);
          });
      });
    };
  }


  if (!navigator.requestGPIOAccess) {
    /**
     * @function
     *　navigator requestGPIOAccess 割当処理
     * @return {*} 割当結果
     */
     navigator.requestGPIOAccess = () => {
      return new Promise(function (resolve, reject) {
        //      console.dir(bone);
        bone
          .waitConnection()
          .then(() => {
            var gpioAccess = new GPIOAccess();
            infoLog("gpioAccess.resolve");
            resolve(gpioAccess);
          })
          .catch((e) => {
            reject(e);
          });
      });
    };
  }




})();
