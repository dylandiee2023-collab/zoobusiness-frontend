import type { RouteObject } from "react-router-dom";

export type AppShellName =
  | "auth"
  | "dashboard"
  | "blank"
  | "error"
  | "pos"
  | "marketplace"
  | "public";

export interface AppRouteHandle {
  readonly title?: string;
  readonly shell?: AppShellName;
  readonly requiresAuthentication?: boolean;
  readonly permissions?: readonly string[];
}

export type AppRouteObject = RouteObject & {
  readonly handle?: AppRouteHandle;
};

export const routes: readonly AppRouteObject[] = [];
