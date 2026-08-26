import type { MenuItem } from "./menu-item";

export class MenuRegistry {
  private readonly items =
    new Map<string, MenuItem>();

  register(
    item: MenuItem,
  ): void {
    this.items.set(
      item.id,
      item,
    );
  }

  unregister(
    id: string,
  ): void {
    this.items.delete(id);
  }

  has(
    id: string,
  ): boolean {
    return this.items.has(id);
  }

  resolve(
    id: string,
  ): MenuItem | undefined {
    return this.items.get(id);
  }

  values(): readonly MenuItem[] {
    return [
      ...this.items.values(),
    ].sort(
      (a, b) => a.order - b.order,
    );
  }

  clear(): void {
    this.items.clear();
  }
}