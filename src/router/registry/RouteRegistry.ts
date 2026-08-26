import type {
  RouteContract,
} from "../contracts/Route.contract";

import type {
  RouteDefinition,
} from "../types";

export class RouteRegistry implements RouteContract {
  private readonly routes = new Map<string, RouteDefinition>();

  register(route: RouteDefinition): void {
    this.routes.set(route.id, route);
  }

  unregister(id: string): void {
    this.routes.delete(id);
  }

  find(path: string): RouteDefinition | undefined {
    return [...this.routes.values()].find(
      (route) => route.path === path,
    );
  }

  getAll(): RouteDefinition[] {
    return [...this.routes.values()];
  }
}