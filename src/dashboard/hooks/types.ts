export interface DashboardHooks<T> {
  useState(): T;

  useValue<K>(selector: (state: T) => K): K;
}
