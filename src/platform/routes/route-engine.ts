import type {
  RouteEngineContract,
  RouteDefinition,
} from "@/platform/contracts";

export class RouteEngine implements RouteEngineContract {
  private readonly routes: RouteDefinition[] = [];

  getRoutes(): readonly RouteDefinition[] {
    return this.routes;
  }

  register(route: RouteDefinition): void {
    this.routes.push(route);
  }

  unregister(path: string): void {
    const index = this.routes.findIndex((route) => route.path === path);

    if (index >= 0) {
      this.routes.splice(index, 1);
    }
  }

  clear(): void {
    this.routes.length = 0;
  }
}
