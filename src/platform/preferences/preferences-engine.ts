import { StorageKeys } from "@/platform/storage";

export class PreferencesEngine {
  private readonly key = StorageKeys.USER;

  private data = new Map<string, unknown>();

  load(): void {
    const raw = localStorage.getItem(this.key);

    if (!raw) {
      return;
    }

    try {
      const values = JSON.parse(raw) as unknown;

      if (
        typeof values !== "object" ||
        values === null ||
        Array.isArray(values)
      ) {
        this.data.clear();
        return;
      }

      this.data = new Map(
        Object.entries(
          values as Record<string, unknown>,
        ),
      );
    } catch {
      this.data.clear();
      localStorage.removeItem(this.key);
    }
  }

  save(): void {
    const values = Object.fromEntries(this.data);

    localStorage.setItem(
      this.key,
      JSON.stringify(values),
    );
  }

  has(key: string): boolean {
    return this.data.has(key);
  }

  get<T>(key: string): T | null {
    return (this.data.get(key) as T) ?? null;
  }

  set<T>(key: string, value: T): void {
    this.data.set(key, value);

    this.save();
  }

  remove(key: string): void {
    this.data.delete(key);

    this.save();
  }

  clear(): void {
    this.data.clear();

    this.save();
  }
}
