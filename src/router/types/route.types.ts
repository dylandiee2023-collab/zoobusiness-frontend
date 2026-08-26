export type RouteGroup =
  | "public"
  | "auth"
  | "dashboard"
  | "marketplace"
  | "pos"
  | "settings"
  | "system"
  | "error";

export interface RouteDefinition {
  id: string;

  path: string;

  group: RouteGroup;

  shell: string;

  guard?: string;

  component: unknown;

  children?: RouteDefinition[];
}