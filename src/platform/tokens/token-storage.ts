import { StorageKeys } from "@/platform/storage";

import type { TokenPair } from "./token-types";

export class TokenStorage {
  get(): TokenPair | null {
    const accessToken = localStorage.getItem(StorageKeys.ACCESS_TOKEN);

    const refreshToken = localStorage.getItem(StorageKeys.REFRESH_TOKEN);

    if (accessToken === null || refreshToken === null) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  set(tokens: TokenPair): void {
    localStorage.setItem(StorageKeys.ACCESS_TOKEN, tokens.accessToken);

    localStorage.setItem(StorageKeys.REFRESH_TOKEN, tokens.refreshToken);
  }

  clear(): void {
    localStorage.removeItem(StorageKeys.ACCESS_TOKEN);

    localStorage.removeItem(StorageKeys.REFRESH_TOKEN);
  }
}
