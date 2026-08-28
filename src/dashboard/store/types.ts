export interface DashboardStore<T> {
  getState(): T;

  setState(state: T): void;

  updateState(updater: (current: T) => T): void;

  subscribe(listener: (state: T) => void): () => void;
}
