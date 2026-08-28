export interface NavigationEngineContract {
  navigate(path: string): Promise<void>;

  back(): void;

  forward(): void;

  replace(path: string): Promise<void>;

  current(): string;
}
