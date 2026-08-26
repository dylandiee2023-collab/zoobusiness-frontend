export interface LayoutEngineContract {
  readonly layout: string;

  setLayout(
    layout: string,
  ): void;

  reset(): void;
}