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

export class Authentication
  implements AuthenticationContract
{
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
    this.authenticatedState =
      this.tokens.getAccessToken() !== null;
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

    await this.session.start();

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

    if (refreshToken !== null) {
      await this.api.post(
        "/api/auth/logout",
        { refreshToken },
      );
    }

    this.tokens.clear();
    await this.session.end();
    this.currentUser = null;
    this.authenticatedState = false;
  }

  async refresh(): Promise<void> {
    const refreshToken =
      this.tokens.getRefreshToken();

    if (refreshToken === null) {
      await this.session.end();
      this.currentUser = null;
      this.authenticatedState = false;
      return;
    }

    const response =
      await this.api.post<RefreshResponse>(
        "/api/auth/refresh",
        { refreshToken },
      );

    this.tokens.setTokens(
      response.accessToken,
      response.refreshToken,
    );

    await this.session.refresh();

    this.authenticatedState = true;
  }
}
