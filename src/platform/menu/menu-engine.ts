import type { MenuEngineContract, MenuItem } from "@/platform/contracts";

export class MenuEngine implements MenuEngineContract {
  private readonly menu: MenuItem[] = [];

  getMenu(): readonly MenuItem[] {
    return this.menu;
  }

  register(item: MenuItem): void {
    this.menu.push(item);
  }

  unregister(id: string): void {
    const index = this.menu.findIndex((item) => item.id === id);

    if (index >= 0) {
      this.menu.splice(index, 1);
    }
  }

  clear(): void {
    this.menu.length = 0;
  }
}
