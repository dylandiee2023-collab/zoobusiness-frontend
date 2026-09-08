import { StorageError } from "./storage-errors";

export class StorageEngine {
  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  get<T>(key: string): T | null {
    const value = localStorage.getItem(key);

    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      throw new StorageError(`Stored value for key "${key}" is invalid.`);
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new StorageError(
        error instanceof Error
          ? `Unable to persist key "${key}": ${error.message}`
          : `Unable to persist key "${key}".`,
      );
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
