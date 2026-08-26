import type {
  Registry,
  RegistryItem,
} from "./types";

export function createRegistry<
  TKey extends string,
  TValue,
>(): Registry<
  TKey,
  TValue
> {
  const registry =
    new Map<
      TKey,
      TValue
    >();

  return {
    register(item) {
      registry.set(
        item.key,
        item.value,
      );
    },

    unregister(key) {
      registry.delete(key);
    },

    has(key) {
      return registry.has(
        key,
      );
    },

    get(key) {
      return registry.get(
        key,
      );
    },

    getAll() {
      return Array.from(
        registry.entries(),
      ).map(
        ([key, value]) => ({
          key,
          value,
        }),
      ) satisfies RegistryItem<
        TKey,
        TValue
      >[];
    },
  };
}