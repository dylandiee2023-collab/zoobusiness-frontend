import { DEFAULT_THEME } from "@/theme/constants";
import { getStoredTheme } from "@/theme/storage";
import { getSystemTheme } from "@/theme/system";
import { darkTheme, lightTheme } from "@/theme/themes";
import type { Theme, ThemeMode } from "@/theme/types";

export function resolveInitialTheme(): ThemeMode {
  const storedTheme = getStoredTheme();

  if (storedTheme !== DEFAULT_THEME) {
    return storedTheme;
  }

  return getSystemTheme() ?? DEFAULT_THEME;
}

export function resolveTheme(mode: ThemeMode): Theme {
  switch (mode) {
    case "dark":
      return darkTheme;

    case "light":
      return lightTheme;

    case "system":
      return getSystemTheme() === "dark"
        ? darkTheme
        : lightTheme;

    case "glass":
      // TODO: Replace with glassTheme
      return lightTheme;

    case "high-contrast":
      // TODO: Replace with highContrastTheme
      return lightTheme;

    default:
      return lightTheme;
  }
}