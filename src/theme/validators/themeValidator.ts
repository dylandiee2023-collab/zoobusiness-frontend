import type { ThemeMode } from "@/theme/types";

const VALID_THEMES: readonly ThemeMode[] = [
  "system",
  "light",
  "dark",
  "glass",
  "high-contrast",
] as const;

export function isValidTheme(value: unknown): value is ThemeMode {
  return (
    typeof value === "string" &&
    VALID_THEMES.includes(value as ThemeMode)
  );
}

export function validateTheme(
  value: unknown,
  fallback: ThemeMode = "system",
): ThemeMode {
  return isValidTheme(value) ? value : fallback;
}