export interface SessionContract {
  readonly authenticated: boolean;

  readonly expiresAt: Date | null;

  start(): Promise<void>;

  refresh(): Promise<void>;

  end(): Promise<void>;
}