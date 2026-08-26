import type { LayoutType } from "../types/layout.types";

export function resolveLayout(path: string): LayoutType {
  if (path.startsWith("/auth")) return "auth";

  if (path.startsWith("/pos")) return "pos";

  if (path.startsWith("/marketplace")) return "marketplace";

  if (path.startsWith("/error")) return "error";

  if (path.startsWith("/public")) return "public";

  if (path === "/") return "dashboard";

  return "dashboard";
}