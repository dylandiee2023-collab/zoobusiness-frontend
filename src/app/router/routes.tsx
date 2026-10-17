import type { RouteObject } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";

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

function RouteFallback() {
  const location = useLocation();

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeContent: "center",
        gap: 12,
        padding: 24,
        textAlign: "center",
        fontFamily: "inherit",
      }}
    >
      <p style={{ margin: 0, color: "#16834a", fontWeight: 700 }}>
        ZOOBUSINESS
      </p>
      <h1 style={{ margin: 0, fontSize: 28 }}>Page not found</h1>
      <p style={{ margin: 0, color: "#64748b" }}>
        There is no registered page for <code>{location.pathname}</code> yet.
      </p>
      <a
        href="/products"
        style={{
          justifySelf: "center",
          marginTop: 8,
          borderRadius: 10,
          padding: "11px 16px",
          background: "#16834a",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 650,
        }}
      >
        Open Products
      </a>
    </main>
  );
}

export const routes: AppRouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/products" replace />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
    handle: {
      title: "Products",
      shell: "dashboard",
      requiresAuthentication: true,
    },
  },
  {
    path: "*",
    element: <RouteFallback />,
  },
];
