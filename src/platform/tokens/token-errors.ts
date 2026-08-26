export class TokenError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "TokenError";
  }
}

export class TokenNotFoundError extends TokenError {
  constructor() {
    super("Authentication tokens not found.");
  }
}