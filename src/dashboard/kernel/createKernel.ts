import type { DashboardKernel } from "./types";

export function createKernel(): DashboardKernel {
  let running = false;

  return {
    boot(): void {
      running = true;
    },

    shutdown(): void {
      running = false;
    },

    isRunning(): boolean {
      return running;
    },
  };
}
