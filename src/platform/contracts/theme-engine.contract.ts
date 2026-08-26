export type ThemeMode =
  | "light"
  | "dark"
  | "system";

export interface ThemeEngineContract {
  readonly mode: ThemeMode;

  setMode(
    mode: ThemeMode,
  ): void;

  toggle(): void;
}