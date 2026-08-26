export interface AuthenticationSession {
  accessToken: string;

  refreshToken: string;

  expiresAt: string;
}