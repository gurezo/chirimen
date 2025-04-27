export interface II2CSlaveDevice {
  read(length: number): Promise<number[]>;
  write(data: Uint8Array): Promise<void>;
  writeRead(writeData: Uint8Array, readLength: number): Promise<number[]>;
}
