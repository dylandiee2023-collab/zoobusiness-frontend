import { getStoredTheme } from "@/theme/storage";
import { darkTheme, lightTheme } from "@/theme/themes";
import type { Theme, ThemeMode } from "@/theme/types";

export function resolveInitialTheme(): ThemeMode {
  // Keep "system" as the selected preference when no explicit user choice
  // exists, so the theme provider can continue following OS appearance changes.
  return getStoredTheme();
}

export function resolveTheme(mode: ThemeMode): Theme {
  switch (mode) {
    case "dark":
      return darkTheme;

    case "light":
      return lightTheme;

    case "system":
      return getSystemTheme() === "dark" ? darkTheme : lightTheme;
  }
}
