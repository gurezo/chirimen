import { II2CSlaveDevice } from "./i2c-slave-device.interface";

export interface II2CPort {
  getSlaveDevice(slaveAddress: number): Promise<II2CSlaveDevice>;
}
