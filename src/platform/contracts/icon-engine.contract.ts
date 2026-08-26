export interface IconEngineContract {
  has(name: string): boolean;

  resolve(name: string): unknown;

  register(
    name: string,
    icon: unknown,
  ): void;
}