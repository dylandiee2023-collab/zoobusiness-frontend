import {
  AVAILABLE_THEMES,
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
} from "@/theme/constants";
import type { ThemeMode } from "@/theme/types";

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY);

  if (!stored) {
    return DEFAULT_THEME;
  }

  return AVAILABLE_THEMES.includes(stored as ThemeMode)
    ? (stored as ThemeMode)
    : DEFAULT_THEME;
}

export function saveTheme(theme: ThemeMode): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function removeStoredTheme(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(THEME_STORAGE_KEY);
}