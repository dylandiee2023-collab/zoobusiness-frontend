export class ConfigurationStore {
  private readonly values = new Map<string, unknown>();

  has(key: string): boolean {
    return this.values.has(key);
  }

  get<T>(key: string): T {
    return this.values.get(key) as T;
  }

  set<T>(key: string, value: T): void {
    this.values.set(key, value);
  }

  remove(key: string): void {
    this.values.delete(key);
  }

  clear(): void {
    this.values.clear();
  }
}
