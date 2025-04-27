import { IGPIOPort } from "./gpio-port.interface";

export interface IGPIOAccess {
  getPort(portNumber: number): Promise<IGPIOPort>;
}
