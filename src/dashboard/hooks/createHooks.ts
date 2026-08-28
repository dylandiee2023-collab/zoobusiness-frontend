import type { DashboardStore } from "@/dashboard/store";

import type { DashboardHooks } from "./types";

export function createHooks<T>(store: DashboardStore<T>): DashboardHooks<T> {
  return {
    useState(): T {
      return store.getState();
    },

    useValue<K>(selector: (state: T) => K): K {
      return selector(store.getState());
    },
  };
}
