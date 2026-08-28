export interface AuthenticationContract {
  readonly authenticated: boolean;

  login(email: string, password: string): Promise<void>;

  logout(): Promise<void>;

  refresh(): Promise<void>;
}
