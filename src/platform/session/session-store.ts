export interface SessionData {
  id: string;

  userId: string;

  tenantId: string;

  expiresAt: string;
}

export class SessionStore {
  private session: SessionData | null = null;

  get(): SessionData | null {
    return this.session;
  }

  set(session: SessionData): void {
    this.session = session;
  }

  clear(): void {
    this.session = null;
  }

  has(): boolean {
    return this.session !== null;
  }
}
