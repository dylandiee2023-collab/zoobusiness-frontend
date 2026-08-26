import type {
  DashboardBootstrap,
} from "./types";

export function createBootstrap(): DashboardBootstrap {
  let initialized = false;

  return {
    initialize(): void {
      initialized = true;
    },

    destroy(): void {
      initialized = false;
    },

    isInitialized(): boolean {
      return initialized;
    },
  };
}