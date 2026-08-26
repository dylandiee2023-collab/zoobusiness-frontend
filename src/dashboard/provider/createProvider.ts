import type {
  DashboardProvider,
} from "./types";

export function createProvider<T>(
  initialValue: T,
): DashboardProvider<T> {
  let state = initialValue;

  return {
    get() {
      return state;
    },

    set(
      value,
    ) {
      state = value;
    },

    update(
      updater,
    ) {
      state = updater(
        state,
      );
    },

    reset() {
      state = initialValue;
    },
  };
}