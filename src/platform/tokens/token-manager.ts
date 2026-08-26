import type {
  TokenManagerContract,
} from "@/platform/contracts";

import { TokenStorage } from "./token-storage";

export class TokenManager
  implements TokenManagerContract
{
  private readonly storage =
    new TokenStorage();

  getAccessToken(): string | null {
    return (
      this.storage.get()
        ?.accessToken ?? null
    );
  }

  getRefreshToken(): string | null {
    return (
      this.storage.get()
        ?.refreshToken ?? null
    );
  }

  setTokens(
    accessToken: string,
    refreshToken: string,
  ): void {
    this.storage.set({
      accessToken,
      refreshToken,
    });
  }

  clear(): void {
    this.storage.clear();
  }
}