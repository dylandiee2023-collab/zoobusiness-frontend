import type { IconDefinition } from "./icon-types";

export class IconRegistry {
  private readonly icons = new Map<string, IconDefinition>();

  register(icon: IconDefinition): void {
    this.icons.set(icon.id, icon);
  }

  has(id: string): boolean {
    return this.icons.has(id);
  }

  resolve(id: string): IconDefinition | undefined {
    return this.icons.get(id);
  }

  values(): readonly IconDefinition[] {
    return [...this.icons.values()];
  }

  clear(): void {
    this.icons.clear();
  }
}
