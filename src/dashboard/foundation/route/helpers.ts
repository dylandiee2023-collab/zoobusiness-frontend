import { ROUTES } from "./constants";
import type { RouteType } from "./types";

export function getRoute(
  route: RouteType,
) {
  return ROUTES[route];
}

export function getRoutePath(
  route: RouteType,
): string {
  return ROUTES[route].path;
}