export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "AuthenticationError";
  }
}

export class InvalidCredentialsError extends AuthenticationError {
  constructor() {
    super("Invalid credentials.");
  }
}

export class SessionExpiredError extends AuthenticationError {
  constructor() {
    super("Session expired.");
  }
}
