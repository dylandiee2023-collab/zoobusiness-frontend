export interface CacheContract {
  has(key: string): boolean;

  get<T>(key: string): T | null;

  set<T>(key: string, value: T): void;

  remove(key: string): void;

  clear(): void;
}
