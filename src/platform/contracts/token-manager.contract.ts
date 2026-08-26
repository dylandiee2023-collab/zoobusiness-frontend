export interface TokenManagerContract {
  getAccessToken(): string | null;

  getRefreshToken(): string | null;

  setTokens(
    accessToken: string,
    refreshToken: string,
  ): void;

  clear(): void;
}