import type { RouteDefinition } from "../types";

export interface LayoutContract {
  resolve(route: RouteDefinition): string;
}