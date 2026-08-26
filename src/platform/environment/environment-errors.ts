export class EnvironmentError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "EnvironmentError";
  }
}

export class InvalidEnvironmentError extends EnvironmentError {
  constructor(mode: string) {
    super(`Invalid environment "${mode}".`);
  }
}