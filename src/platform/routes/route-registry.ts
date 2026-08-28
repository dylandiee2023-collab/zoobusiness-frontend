import type { RouteDefinition } from "./route-definition";

export class RouteRegistry {
  private readonly routes = new Map<string, RouteDefinition>();

  register(route: RouteDefinition): void {
    this.routes.set(route.path, route);
  }

  unregister(path: string): void {
    this.routes.delete(path);
  }

  has(path: string): boolean {
    return this.routes.has(path);
  }

  resolve(path: string): RouteDefinition | undefined {
    return this.routes.get(path);
  }

  values(): readonly RouteDefinition[] {
    return [...this.routes.values()];
  }

  clear(): void {
    this.routes.clear();
  }
}
