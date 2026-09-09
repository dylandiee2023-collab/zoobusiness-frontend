import type {
  ApiClientContract,
  AuthenticatedUser,
  AuthenticationContract,
  SessionContract,
  TokenManagerContract,
} from "@/platform/contracts";

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
  };
}

interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  refreshExpiresAt: string;
  user: AuthenticatedUser;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export class Authentication implements AuthenticationContract {
  private readonly api: ApiClientContract;
  private readonly tokens: TokenManagerContract;
  private readonly session: SessionContract;
  private authenticatedState: boolean;
  private currentUser: AuthenticatedUser | null;

  constructor(
    api: ApiClientContract,
    tokens: TokenManagerContract,
    session: SessionContract,
  ) {
    this.api = api;
    this.tokens = tokens;
    this.session = session;
    this.authenticatedState = this.hasValidAccessToken();
    this.currentUser = null;
  }

  get authenticated(): boolean {
    return this.authenticatedState;
  }

  get user(): AuthenticatedUser | null {
    return this.currentUser;
  }

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.api.post<RegisterResponse>(
      "/api/auth/register",
      { name, email, password },
    );
  }

  async login(
    email: string,
    password: string,
  ): Promise<void> {
    const response =
      await this.api.post<LoginResponse>(
        "/api/auth/login",
        { email, password },
      );

    this.tokens.setTokens(
      response.accessToken,
      response.refreshToken,
    );

    this.currentUser = response.user;

    await this.session.start(
      this.getAccessTokenExpiry(response.accessToken),
    );

    this.authenticatedState = true;
  }

  async verifyEmail(
    email: string,
    code: string,
  ): Promise<void> {
    await this.api.post(
      "/api/auth/verify-email",
      { email, code },
    );

    if (this.currentUser?.email === email) {
      this.currentUser = {
        ...this.currentUser,
        emailVerified: true,
      };
    }
  }

  async resendVerification(email: string): Promise<void> {
    await this.api.post(
      "/api/auth/resend-verification",
      { email },
    );
  }

  async logout(): Promise<void> {
    const refreshToken =
      this.tokens.getRefreshToken();

    try {
      if (refreshToken !== null) {
        await this.api.post(
          "/api/auth/logout",
          { refreshToken },
        );
      }
    } finally {
      this.tokens.clear();
      await this.session.end();
      this.currentUser = null;
      this.authenticatedState = false;
    }
  }

  async refresh(): Promise<void> {
    const refreshToken =
      this.tokens.getRefreshToken();

    if (refreshToken === null) {
      await this.clearAuthenticationState();
      return;
    }

    try {
      const response =
        await this.api.post<RefreshResponse>(
          "/api/auth/refresh",
          { refreshToken },
        );

      this.tokens.setTokens(
        response.accessToken,
        response.refreshToken,
      );

      await this.session.refresh(response.expiresAt);

      this.authenticatedState = true;
    } catch (error) {
      await this.clearAuthenticationState();
      throw error;
    }
  }

  private hasValidAccessToken(): boolean {
    const accessToken = this.tokens.getAccessToken();

    if (accessToken === null) {
      return false;
    }

    const expiresAt = this.getAccessTokenExpiry(accessToken);

    if (expiresAt === null) {
      return true;
    }

    if (expiresAt.getTime() <= Date.now()) {
      this.tokens.clear();
      return false;
    }

    void this.session.start(expiresAt);
    return true;
  }

  private getAccessTokenExpiry(
    accessToken: string,
  ): Date | null {
    const parts = accessToken.split(".");

    if (parts.length !== 3) {
      return null;
    }

    try {
      const payload = JSON.parse(
        this.decodeBase64Url(parts[1]),
      ) as { exp?: unknown };

      if (typeof payload.exp !== "number") {
        return null;
      }

      return new Date(payload.exp * 1000);
    } catch {
      return null;
    }
  }

  private decodeBase64Url(value: string): string {
    const base64 = value
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(value.length / 4) * 4, "=");

    return decodeURIComponent(
      Array.from(atob(base64))
        .map((character) =>
          `%${character.charCodeAt(0).toString(16).padStart(2, "0")}`,
        )
        .join(""),
    );
  }

  private async clearAuthenticationState(): Promise<void> {
    this.tokens.clear();
    await this.session.end();
    this.currentUser = null;
    this.authenticatedState = false;
  }
}
