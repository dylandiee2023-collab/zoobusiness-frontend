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
  private authenticatedState = false;
  private currentUser: AuthenticatedUser | null = null;
  private readyState = false;

  constructor(
    api: ApiClientContract,
    tokens: TokenManagerContract,
    session: SessionContract,
  ) {
    this.api = api;
    this.tokens = tokens;
    this.session = session;
  }

  get authenticated(): boolean {
    return this.authenticatedState;
  }

  get user(): AuthenticatedUser | null {
    return this.currentUser;
  }

  get ready(): boolean {
    return this.readyState;
  }

  async hydrate(): Promise<void> {
    if (this.readyState) return;

    const accessToken = this.tokens.getAccessToken();
    const refreshToken = this.tokens.getRefreshToken();

    if (accessToken === null || refreshToken === null) {
      this.readyState = true;
      return;
    }

    const expiresAt = this.getAccessTokenExpiry(accessToken);

    if (expiresAt !== null && expiresAt.getTime() <= Date.now()) {
      try {
        await this.refresh();
      } catch {
        // refresh() clears invalid persisted credentials.
      }
    } else {
      try {
        // Validate the persisted session against the backend. A token that
        // merely exists in localStorage must not be trusted forever.
        await this.refresh();
      } catch {
        // refresh() clears the session when the persisted credentials are no longer valid.
      }
    }

    this.readyState = true;
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

  async login(email: string, password: string): Promise<void> {
    const response = await this.api.post<LoginResponse>(
      "/api/auth/login",
      { email, password },
    );

    this.tokens.setTokens(response.accessToken, response.refreshToken);
    this.currentUser = response.user;

    await this.session.start(this.getAccessTokenExpiry(response.accessToken));
    this.authenticatedState = true;
    this.readyState = true;
  }

  async verifyEmail(email: string, code: string): Promise<void> {
    await this.api.post("/api/auth/verify-email", { email, code });

    if (this.currentUser?.email === email) {
      this.currentUser = {
        ...this.currentUser,
        emailVerified: true,
      };
    }
  }

  async resendVerification(email: string): Promise<void> {
    await this.api.post("/api/auth/resend-verification", { email });
  }

  async logout(): Promise<void> {
    const refreshToken = this.tokens.getRefreshToken();

    try {
      if (refreshToken !== null) {
        await this.api.post("/api/auth/logout", { refreshToken });
      }
    } finally {
      await this.clearAuthenticationState();
      this.readyState = true;
    }
  }

  async refresh(): Promise<void> {
    const refreshToken = this.tokens.getRefreshToken();

    if (refreshToken === null) {
      await this.clearAuthenticationState();
      return;
    }

    try {
      const response = await this.api.post<RefreshResponse>(
        "/api/auth/refresh",
        { refreshToken },
      );

      this.tokens.setTokens(response.accessToken, response.refreshToken);
      await this.session.refresh(response.expiresAt);
      this.authenticatedState = true;
    } catch (error) {
      await this.clearAuthenticationState();
      throw error;
    }
  }

  private async clearAuthenticationState(): Promise<void> {
    this.tokens.clear();
    await this.session.end();
    this.currentUser = null;
    this.authenticatedState = false;
  }

  private getAccessTokenExpiry(accessToken: string): Date | null {
    const parts = accessToken.split(".");

    if (parts.length !== 3) return null;

    const payloadPart = parts[1];
    if (payloadPart === undefined) return null;

    try {
      const payload = JSON.parse(this.decodeBase64Url(payloadPart)) as {
        exp?: unknown;
      };

      if (typeof payload.exp !== "number") return null;
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
}
