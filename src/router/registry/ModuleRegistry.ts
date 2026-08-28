import type { RouteDefinition } from "../types";

export class ModuleRegistry {
  private readonly modules = new Map<string, RouteDefinition>();

  register(module: RouteDefinition): void {
    this.modules.set(module.id, module);
  }

  unregister(id: string): void {
    this.modules.delete(id);
  }

  find(id: string): RouteDefinition | undefined {
    return this.modules.get(id);
  }

  getAll(): RouteDefinition[] {
    return [...this.modules.values()];
  }
}
