export class SessionError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "SessionError";
  }
}

export class SessionNotFoundError extends SessionError {
  constructor() {
    super("Session not found.");
  }
}