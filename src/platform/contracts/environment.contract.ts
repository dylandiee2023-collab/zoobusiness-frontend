export interface EnvironmentContract {
  readonly mode: "development" | "production" | "test";

  readonly isDevelopment: boolean;

  readonly isProduction: boolean;

  readonly isTest: boolean;
}
