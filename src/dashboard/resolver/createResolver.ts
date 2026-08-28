import type { Resolver } from "./types";

export function createResolver<TKey extends string, TValue>(): Resolver<
  TKey,
  TValue
> {
  const storage = new Map<TKey, TValue>();

  return {
    register(key, value) {
      storage.set(key, value);
    },

    unregister(key) {
      storage.delete(key);
    },

    resolve(key) {
      return storage.get(key);
    },

    has(key) {
      return storage.has(key);
    },

    clear() {
      storage.clear();
    },
  };
}
