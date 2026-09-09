export interface SessionContract {
  readonly authenticated: boolean;

  readonly expiresAt: Date | null;

  start(expiresAt?: Date | string | null): Promise<void>;

  refresh(expiresAt?: Date | string | null): Promise<void>;

  end(): Promise<void>;
}
