export interface RouteDefinition {
  path: string;

  component: unknown;

  permissions?: readonly string[];
}

export interface RouteEngineContract {
  getRoutes(): readonly RouteDefinition[];

  register(route: RouteDefinition): void;

  unregister(path: string): void;

  clear(): void;
}
