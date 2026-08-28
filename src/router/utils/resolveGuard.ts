import type { RouteDefinition } from "../types";

export function resolveGuard(route: RouteDefinition): string | undefined {
  return route.guard;
}
