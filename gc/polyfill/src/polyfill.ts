// export * from "./fucntions";

import { errLog, infoLog, sleep } from "./functions";

const serverURL = "wss://localhost:33330/";

(() => {
  // Do something
  infoLog("Polyfill loaded!");
  errLog("Polyfill error log test!");
  sleep(1000);
})();
