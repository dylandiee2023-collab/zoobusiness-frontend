export interface DashboardProvider<T> {
  get(): T;

  set(value: T): void;

  update(updater: (current: T) => T): void;

  reset(): void;
}
