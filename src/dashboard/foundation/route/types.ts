import { ROUTES } from "./constants";

export type RouteType = keyof typeof ROUTES;

export interface Route {
  id: RouteType;
  path: string;
}