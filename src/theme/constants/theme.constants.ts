import type { ThemeMode } from "@/theme/types";

export const DEFAULT_THEME: ThemeMode = "light";

export const THEME_STORAGE_KEY = "zoobusiness.theme";

export const AVAILABLE_THEMES: readonly ThemeMode[] = [
  "light",
  "dark",
  "glass",
  "high-contrast",
] as const;