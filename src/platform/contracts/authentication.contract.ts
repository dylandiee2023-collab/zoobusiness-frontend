export interface AuthenticatedUser {
  readonly id: string;

  readonly name: string;

  readonly email: string;

  readonly emailVerified: boolean;
}

export interface AuthenticationContract {
  readonly authenticated: boolean;

  readonly user: AuthenticatedUser | null;

  readonly ready: boolean;

  register(
    name: string,
    email: string,
    password: string,
  ): Promise<void>;

  login(
    email: string,
    password: string,
  ): Promise<void>;

  verifyEmail(
    email: string,
    code: string,
  ): Promise<void>;

  resendVerification(email: string): Promise<void>;

  logout(): Promise<void>;

  refresh(): Promise<void>;
}
