import type {
  DashboardContext,
} from "./types";

export function createContext<T>(
  initialState: T,
): DashboardContext<T> {
  let state = initialState;

  const listeners =
    new Set<
      (state: T) => void
    >();

  function notify() {
    listeners.forEach(
      listener =>
        listener(state),
    );
  }

  return {
    get() {
      return state;
    },

    set(
      value,
    ) {
      state = value;
      notify();
    },

    update(
      updater,
    ) {
      state = updater(
        state,
      );

      notify();
    },

    subscribe(
      listener,
    ) {
      listeners.add(
        listener,
      );

      return () => {
        listeners.delete(
          listener,
        );
      };
    },
  };
}