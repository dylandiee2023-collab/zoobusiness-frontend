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

  async start(): Promise<void> {
    this.authenticatedState = true;

    this.expiry = new Date(Date.now() + 60 * 60 * 1000);
  }

  async refresh(): Promise<void> {
    if (!this.authenticatedState) {
      return;
    }

    this.expiry = new Date(Date.now() + 60 * 60 * 1000);
  }

  async end(): Promise<void> {
    this.authenticatedState = false;

    this.expiry = null;
  }
}
