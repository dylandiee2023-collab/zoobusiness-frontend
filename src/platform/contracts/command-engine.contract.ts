export interface Command {
  readonly id: string;

  execute(): Promise<void>;
}

export interface CommandEngineContract {
  register(command: Command): void;

  execute(id: string): Promise<void>;

  unregister(id: string): void;

  clear(): void;
}
