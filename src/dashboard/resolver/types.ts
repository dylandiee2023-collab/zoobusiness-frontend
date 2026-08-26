export interface Resolver<TKey extends string, TValue> {
  register(
    key: TKey,
    value: TValue,
  ): void;

  unregister(
    key: TKey,
  ): void;

  resolve(
    key: TKey,
  ): TValue | undefined;

  has(
    key: TKey,
  ): boolean;

  clear(): void;
}