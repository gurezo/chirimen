export interface IGPIOPort {
  setDirection(direction: "in" | "out"): Promise<void>;
  read(): Promise<number>;
  write(value: number): Promise<void>;
  onchange(callback: (value: number) => void): void;
}
