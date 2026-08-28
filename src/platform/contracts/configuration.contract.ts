export interface ConfigurationContract {
  has(key: string): boolean;

  get<T>(key: string): T;

  set<T>(key: string, value: T): void;

  remove(key: string): void;

  clear(): void;
}
