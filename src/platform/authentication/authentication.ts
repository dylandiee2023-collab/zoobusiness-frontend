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
  private readonly listeners = new Set<() => void>();
  private authenticatedState = false;
  private currentUser: AuthenticatedUser | null = null;
  private readyState = false;
  private hydrateInFlight: Promise<void> | null = null;
  private refreshInFlight: Promise<void> | null = null;

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

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  async hydrate(): Promise<void> {
    if (this.readyState) return;
    if (this.hydrateInFlight !== null) return this.hydrateInFlight;

    this.hydrateInFlight = this.performHydrate();

    try {
      await this.hydrateInFlight;
    } finally {
      this.hydrateInFlight = null;
    }
  }

  private async performHydrate(): Promise<void> {
    const accessToken = this.tokens.getAccessToken();
    const refreshToken = this.tokens.getRefreshToken();

    if (accessToken === null || refreshToken === null) {
      this.readyState = true;
      this.notify();
      return;
    }

    try {
      await this.refresh();
    } catch {
      // refresh() clears invalid persisted credentials.
    } finally {
      this.readyState = true;
      this.notify();
    }
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
    this.notify();
  }

  async verifyEmail(email: string, code: string): Promise<void> {
    await this.api.post("/api/auth/verify-email", { email, code });

    if (this.currentUser?.email === email) {
      this.currentUser = {
        ...this.currentUser,
        emailVerified: true,
      };
      this.notify();
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
      this.notify();
    }
  }

  async refresh(): Promise<void> {
    if (this.refreshInFlight !== null) return this.refreshInFlight;

    this.refreshInFlight = this.performRefresh();

    try {
      await this.refreshInFlight;
    } finally {
      this.refreshInFlight = null;
    }
  }

  private async performRefresh(): Promise<void> {
    const refreshToken = this.tokens.getRefreshToken();

    if (refreshToken === null) {
      await this.clearAuthenticationState();
      this.notify();
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
      this.notify();
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
