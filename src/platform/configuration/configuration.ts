import type { ConfigurationContract } from "@/platform/contracts";

import { ConfigurationNotFoundError } from "./configuration-errors";

import { ConfigurationStore } from "./configuration-store";

export class Configuration implements ConfigurationContract {
  private readonly store = new ConfigurationStore();

  has(key: string): boolean {
    return this.store.has(key);
  }

  get<T>(key: string): T {
    if (!this.has(key)) {
      throw new ConfigurationNotFoundError(key);
    }

    return this.store.get<T>(key);
  }

  set<T>(key: string, value: T): void {
    this.store.set(key, value);
  }

  remove(key: string): void {
    this.store.remove(key);
  }

  clear(): void {
    this.store.clear();
  }
}
