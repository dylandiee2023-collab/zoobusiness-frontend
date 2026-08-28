import type { ResponsiveEngineContract } from "@/platform/contracts";

export class ResponsiveEngine implements ResponsiveEngineContract {
  get width(): number {
    return window.innerWidth;
  }

  get height(): number {
    return window.innerHeight;
  }

  get mobile(): boolean {
    return this.width < 768;
  }

  get tablet(): boolean {
    return this.width >= 768 && this.width < 1024;
  }

  get laptop(): boolean {
    return this.width >= 1024 && this.width < 1440;
  }

  get desktop(): boolean {
    return this.width >= 1440;
  }
}
