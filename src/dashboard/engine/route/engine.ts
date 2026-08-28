import type { Route, RouteType } from "@/dashboard/foundation";

import { getRoute } from "@/dashboard/foundation";

export interface RouteEngine {
  current: RouteType;

  exists(): boolean;

  resolve(): Route;

  is(route: RouteType): boolean;
}

export function createRouteEngine(route: RouteType): RouteEngine {
  return {
    current: route,

    exists(): boolean {
      return !!getRoute(route);
    },

    resolve(): Route {
      return getRoute(route);
    },

    is(target: RouteType): boolean {
      return route === target;
    },
  };
}
