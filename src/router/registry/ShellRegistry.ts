import type { RouteDefinition } from "../types";

export class ShellRegistry {
  private readonly shells = new Map<string, RouteDefinition[]>();

  register(shell: string, route: RouteDefinition): void {
    const routes = this.shells.get(shell) ?? [];

    routes.push(route);

    this.shells.set(shell, routes);
  }

  get(shell: string): RouteDefinition[] {
    return this.shells.get(shell) ?? [];
  }

  clear(): void {
    this.shells.clear();
  }
}
