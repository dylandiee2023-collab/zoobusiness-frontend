import type { SessionContract } from "@/platform/contracts";

export class Session implements SessionContract {
  private authenticatedState = false;

  private expiry: Date | null = null;

  get authenticated(): boolean {
    return this.authenticatedState;
  }

  get expiresAt(): Date | null {
    return this.expiry;
  }

  async start(expiresAt?: Date | string | null): Promise<void> {
    this.authenticatedState = true;
    this.expiry = this.resolveExpiry(expiresAt);
  }

  async refresh(expiresAt?: Date | string | null): Promise<void> {
    if (!this.authenticatedState) {
      return;
    }

    this.expiry = this.resolveExpiry(expiresAt);
  }

  async end(): Promise<void> {
    this.authenticatedState = false;
    this.expiry = null;
  }

  private resolveExpiry(expiresAt?: Date | string | null): Date | null {
    if (expiresAt === undefined || expiresAt === null) {
      return null;
    }

    const value =
      expiresAt instanceof Date ? expiresAt.getTime() : Date.parse(expiresAt);

    return Number.isNaN(value) ? null : new Date(value);
  }
}
