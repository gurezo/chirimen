import { GPIOAccess } from "./gpio/gpio-access";
import { I2CAccess } from "./i2c/i2c-access";
import { sleep } from "./utils";

const serverURL = "wss://localhost:33330/";

// グローバルオブジェクトに追加
declare global {
  interface Window {
    GPIOAccess: typeof GPIOAccess;
    I2CAccess: typeof I2CAccess;
    sleep: typeof sleep;
  }
}

window.GPIOAccess = GPIOAccess;
window.I2CAccess = I2CAccess;
window.sleep = sleep;
