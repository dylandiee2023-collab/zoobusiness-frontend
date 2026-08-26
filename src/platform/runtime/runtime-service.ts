export interface RuntimeService {
  readonly id: string;

  readonly priority: number;

  initialize(): Promise<void>;

  start(): Promise<void>;

  stop(): Promise<void>;

  destroy(): Promise<void>;
}