import { StorageKeys } from "@/platform/storage";

import type { ThemeMode } from "@/platform/contracts";

const VALID_THEME_MODES: readonly ThemeMode[] = ["system", "light", "dark"];

export class ThemeStorage {
  load(): ThemeMode {
    const value = localStorage.getItem(StorageKeys.THEME);

    if (VALID_THEME_MODES.includes(value as ThemeMode)) {
      return value as ThemeMode;
    }

    return "system";
  }

  save(mode: ThemeMode): void {
    localStorage.setItem(StorageKeys.THEME, mode);
  }
}
