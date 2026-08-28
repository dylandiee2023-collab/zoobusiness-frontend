import { StorageKeys } from "@/platform/storage";

import type { ThemeMode } from "@/platform/contracts";

export class ThemeStorage {
  load(): ThemeMode {
    const value = localStorage.getItem(StorageKeys.THEME);

    if (value === "light" || value === "dark" || value === "system") {
      return value;
    }

    return "system";
  }

  save(mode: ThemeMode): void {
    localStorage.setItem(StorageKeys.THEME, mode);
  }
}
