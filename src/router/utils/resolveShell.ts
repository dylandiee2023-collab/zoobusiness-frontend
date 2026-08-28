import type { RouteDefinition } from "../types";

export function resolveShell(route: RouteDefinition): string {
  return route.shell;
}
