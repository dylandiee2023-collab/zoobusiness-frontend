import type {
  DashboardStore,
} from "./types";

export function createStore<T>(
  initialState: T,
): DashboardStore<T> {
  let state = initialState;

  const listeners =
    new Set<
      (state: T) => void
    >();

  function notify(): void {
    listeners.forEach(
      listener =>
        listener(state),
    );
  }

  return {
    getState(): T {
      return state;
    },

    setState(
      nextState: T,
    ): void {
      state = nextState;
      notify();
    },

    updateState(
      updater,
    ): void {
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