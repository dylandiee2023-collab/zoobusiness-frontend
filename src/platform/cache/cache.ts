import type {
  CacheContract,
} from "@/platform/contracts";

import { CacheEngine } from "./cache-engine";

export class Cache
  implements CacheContract
{
  private readonly engine =
    new CacheEngine();

  has(
    key: string,
  ): boolean {
    return this.engine.has(key);
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

  clear(): void {
    this.engine.clear();
  }
}