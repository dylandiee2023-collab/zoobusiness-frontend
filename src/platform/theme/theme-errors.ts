export class ThemeError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "ThemeError";
  }
}

export class InvalidThemeModeError extends ThemeError {
  constructor(mode: string) {
    super(
      `Invalid theme mode "${mode}".`,
    );
  }
}