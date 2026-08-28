import type { AuthenticationContract } from "@/platform/contracts";

export class Authentication implements AuthenticationContract {
  readonly authenticated = false;

  async login(email: string, password: string): Promise<void> {
    void email;
    void password;

    throw new Error("Not connected to API yet.");
  }

  async logout(): Promise<void> {}

  async refresh(): Promise<void> {}
}
