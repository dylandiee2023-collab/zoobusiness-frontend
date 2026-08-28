import type { EnvironmentContract } from "@/platform/contracts";

import { InvalidEnvironmentError } from "./environment-errors";

import { EnvironmentState, type EnvironmentMode } from "./environment-state";

export class Environment implements EnvironmentContract {
  private readonly state: EnvironmentState;

  constructor() {
    const mode = (import.meta.env.MODE ?? "development") as EnvironmentMode;

    if (mode !== "development" && mode !== "production" && mode !== "test") {
      throw new InvalidEnvironmentError(mode);
    }

    this.state = new EnvironmentState(mode);
  }

  get mode(): EnvironmentMode {
    return this.state.current();
  }

  get isDevelopment(): boolean {
    return this.state.isDevelopment();
  }

  get isProduction(): boolean {
    return this.state.isProduction();
  }

  get isTest(): boolean {
    return this.state.isTest();
  }
}
