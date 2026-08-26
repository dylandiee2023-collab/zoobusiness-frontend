export type EnvironmentMode =
  | "development"
  | "production"
  | "test";

export class EnvironmentState {
  private mode: EnvironmentMode;

  constructor(mode: EnvironmentMode) {
    this.mode = mode;
  }

  current(): EnvironmentMode {
    return this.mode;
  }

  isDevelopment(): boolean {
    return this.mode === "development";
  }

  isProduction(): boolean {
    return this.mode === "production";
  }

  isTest(): boolean {
    return this.mode === "test";
  }
}