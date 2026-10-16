import type { RouteObject } from "react-router-dom";

import { DashboardPage } from "@/pages/dashboard/DashboardPage";

export type AppShellName =
  "auth" | "dashboard" | "blank" | "error" | "pos" | "marketplace" | "public";

export interface AppRouteHandle {
  readonly title?: string;
  readonly shell?: AppShellName;
  readonly requiresAuthentication?: boolean;
  readonly permissions?: readonly string[];
}

export type AppRouteObject = RouteObject & {
  readonly handle?: AppRouteHandle;
};

export const routes: AppRouteObject[] = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
    handle: {
      title: "Dashboard | ZooBusiness",
      shell: "dashboard",
      requiresAuthentication: true,
      permissions: ["report.view"],
    },
  },
];
