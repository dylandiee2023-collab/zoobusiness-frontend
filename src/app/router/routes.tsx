import type { RouteObject } from "react-router-dom";

import { WelcomePage } from "@/pages/welcome/WelcomePage";

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
    path: "/",
    element: <WelcomePage />,
    handle: {
      title: "Welcome to ZooBusiness",
      shell: "public",
    },
  },
];
