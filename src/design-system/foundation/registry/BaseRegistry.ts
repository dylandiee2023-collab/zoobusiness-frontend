export abstract class BaseRegistry<TKey, TValue> {
  protected readonly items = new Map<TKey, TValue>();

  protected set(key: TKey, value: TValue): void {
    this.items.set(key, value);
  }

  protected delete(key: TKey): void {
    this.items.delete(key);
  }

  protected getValue(key: TKey): TValue | undefined {
    return this.items.get(key);
  }

  protected hasValue(key: TKey): boolean {
    return this.items.has(key);
  }

  protected values(): readonly TValue[] {
    return Array.from(this.items.values());
  }

  clear(): void {
    this.items.clear();
  }
}
