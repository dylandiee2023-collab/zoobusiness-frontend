import { DEFAULT_THEME } from "@/theme/constants";
import type { ThemeMode } from "@/theme/types";

export function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  return mediaQuery.matches ? "dark" : "light";
}

export function watchSystemTheme(
  callback: (theme: ThemeMode) => void,
): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const listener = (event: MediaQueryListEvent) => {
    callback(event.matches ? "dark" : "light");
  };

  mediaQuery.addEventListener("change", listener);

  return () => {
    mediaQuery.removeEventListener("change", listener);
  };
}