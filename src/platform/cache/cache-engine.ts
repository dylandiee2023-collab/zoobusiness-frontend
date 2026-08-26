import type { CacheEntry } from "./cache-entry";

export class CacheEngine {
  private readonly cache =
    new Map<string, CacheEntry>();

  has(key: string): boolean {
    const entry = this.cache.get(key);

    if (!entry) {
      return false;
    }

    if (
      entry.expiresAt !== undefined &&
      entry.expiresAt < Date.now()
    ) {
      this.cache.delete(key);

      return false;
    }

    return true;
  }

  get<T>(key: string): T | null {
    if (!this.has(key)) {
      return null;
    }

    return this.cache.get(key)!
      .value as T;
  }

  set<T>(
    key: string,
    value: T,
    ttl?: number,
  ): void {
    const entry: CacheEntry<T> = {
      value,
      createdAt: Date.now(),
    };

    if (ttl !== undefined) {
      entry.expiresAt =
        Date.now() + ttl;
    }

    this.cache.set(key, entry);
  }

  remove(
    key: string,
  ): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}