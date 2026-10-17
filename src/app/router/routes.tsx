import type { RouteObject } from "react-router-dom";

import { ProductsPage } from "@/features/products";

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

export const routes: AppRouteObject[] = [
  {
    path: "/products",
    element: <ProductsPage />,
    handle: {
      title: "Products",
      shell: "dashboard",
      requiresAuthentication: true,
    },
  },
];
