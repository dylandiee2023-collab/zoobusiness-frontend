import type { LayoutEngineContract } from "@/platform/contracts";

export class LayoutEngine implements LayoutEngineContract {
  private currentLayout = "default";

  get layout(): string {
    return this.currentLayout;
  }

  setLayout(layout: string): void {
    this.currentLayout = layout;
  }

  reset(): void {
    this.currentLayout = "default";
  }
}
