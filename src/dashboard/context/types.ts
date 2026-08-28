export interface DashboardContext<T> {
  get(): T;

  set(value: T): void;

  update(updater: (current: T) => T): void;

  subscribe(listener: (state: T) => void): () => void;
}
