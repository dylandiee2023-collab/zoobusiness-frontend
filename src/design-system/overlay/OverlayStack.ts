import type { OverlayItem } from "./Overlay.types";

export class OverlayStack {
  private readonly items: OverlayItem[] = [];

  push(overlay: OverlayItem): void {
    this.items.push(overlay);
  }

  remove(id: string): void {
    const index = this.items.findIndex((overlay) => overlay.id === id);

    if (index === -1) {
      return;
    }

    this.items.splice(index, 1);
  }

  top(): OverlayItem | undefined {
    return this.items.at(-1);
  }

  all(): readonly OverlayItem[] {
    return this.items;
  }

  clear(): void {
    this.items.length = 0;
  }
}
