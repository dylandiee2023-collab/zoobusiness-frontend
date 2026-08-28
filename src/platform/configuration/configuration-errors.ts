export class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "ConfigurationError";
  }
}

export class ConfigurationNotFoundError extends ConfigurationError {
  constructor(key: string) {
    super(`Configuration "${key}" was not found.`);
  }
}
