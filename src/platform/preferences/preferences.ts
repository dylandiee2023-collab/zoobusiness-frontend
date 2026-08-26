import type {
  PreferencesContract,
} from "@/platform/contracts";

import {
  PreferencesEngine,
} from "./preferences-engine";

export class Preferences
  implements PreferencesContract
{
  private readonly engine =
    new PreferencesEngine();

  constructor() {
    this.engine.load();
  }

  get<T>(
    key: string,
  ): T | null {
    return this.engine.get<T>(
      key,
    );
  }

  set<T>(
    key: string,
    value: T,
  ): void {
    this.engine.set(
      key,
      value,
    );
  }

  remove(
    key: string,
  ): void {
    this.engine.remove(key);
  }

  reset(): void {
    this.engine.clear();
  }
}