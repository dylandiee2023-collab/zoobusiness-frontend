import { BaseRegistry } from "../foundation/registry";

import type { OverlayItem } from "./Overlay.types";

export class OverlayRegistry extends BaseRegistry<string, OverlayItem> {
  register(overlay: OverlayItem): void {
    this.set(overlay.id, overlay);
  }

  unregister(id: string): void {
    this.delete(id);
  }

  get(id: string): OverlayItem | undefined {
    return this.getValue(id);
  }

  has(id: string): boolean {
    return this.hasValue(id);
  }

  all(): readonly OverlayItem[] {
    return this.values();
  }
}
