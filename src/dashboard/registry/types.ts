export interface RegistryItem<
  TKey extends string,
  TValue,
> {
  key: TKey;

  value: TValue;
}

export interface Registry<
  TKey extends string,
  TValue,
> {
  register(
    item: RegistryItem<
      TKey,
      TValue
    >,
  ): void;

  unregister(
    key: TKey,
  ): void;

  has(
    key: TKey,
  ): boolean;

  get(
    key: TKey,
  ): TValue | undefined;

  getAll(): RegistryItem<
    TKey,
    TValue
  >[];
}