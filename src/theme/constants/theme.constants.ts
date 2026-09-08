import type { ThemeMode } from "@/theme/types";

export const DEFAULT_THEME: ThemeMode = "light";

export const AVAILABLE_THEMES: readonly ThemeMode[] = [
  "system",
  "light",
  "dark",
] as const;
