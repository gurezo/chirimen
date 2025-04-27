import { II2CPort } from "./i2c-port.interface";

export interface II2CAccess {
  getPort(portNumber: number): Promise<II2CPort>;
}
