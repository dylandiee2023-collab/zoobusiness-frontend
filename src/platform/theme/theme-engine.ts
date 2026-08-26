import type {
  ThemeEngineContract,
} from "@/platform/contracts";

import { ThemeStorage } from "./theme-storage";

import type { ThemeMode } from "@/platform/contracts";

export class ThemeEngine
  implements ThemeEngineContract
{
  private readonly storage =
    new ThemeStorage();

  private currentMode: ThemeMode;

  constructor() {
    this.currentMode =
      this.storage.load();
  }

  get mode(): ThemeMode {
    return this.currentMode;
  }

  setMode(
    mode: ThemeMode,
  ): void {
    this.currentMode = mode;

    this.storage.save(mode);
  }

  toggle(): void {
    if (this.currentMode === "light") {
      this.setMode("dark");

      return;
    }

    if (this.currentMode === "dark") {
      this.setMode("system");

      return;
    }

    this.setMode("light");
  }
}