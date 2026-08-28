import { BaseRegistry } from "../foundation/registry";

import type { NavigationItem } from "./Navigation.types";

export class NavigationRegistry extends BaseRegistry<string, NavigationItem> {
  register(item: NavigationItem): void {
    this.set(item.id, item);
  }

  unregister(id: string): void {
    this.delete(id);
  }

  get(id: string): NavigationItem | undefined {
    return this.getValue(id);
  }

  getAll(): NavigationItem[] {
    return [...this.values()];
  }
}
