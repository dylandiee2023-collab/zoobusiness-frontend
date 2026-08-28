import type { DashboardManager } from "./types";

export function createManager(): DashboardManager {
  let active = false;

  return {
    start(): void {
      active = true;
    },

    stop(): void {
      active = false;
    },

    restart(): void {
      active = false;
      active = true;
    },

    isActive(): boolean {
      return active;
    },
  };
}
