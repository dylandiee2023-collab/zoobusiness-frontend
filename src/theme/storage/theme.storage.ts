import { StorageKeys } from "@/platform/storage";
import type { ThemeMode } from "@/theme/types";

const VALID_THEME_MODES: readonly ThemeMode[] = [
  "system",
  "light",
  "dark",
] as const;

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = localStorage.getItem(StorageKeys.THEME);

  return VALID_THEME_MODES.includes(stored as ThemeMode)
    ? (stored as ThemeMode)
    : "light";
}

export function saveTheme(theme: ThemeMode): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(StorageKeys.THEME, theme);
}

export function removeStoredTheme(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(StorageKeys.THEME);
}
