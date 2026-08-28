export interface BootstrapTask {
  readonly id: string;

  readonly priority: number;

  run(): Promise<void>;
}
