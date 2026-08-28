import type { RouteDefinition } from "../types";

export interface RouteContract {
  register(route: RouteDefinition): void;

  unregister(id: string): void;

  find(path: string): RouteDefinition | undefined;

  getAll(): RouteDefinition[];
}
