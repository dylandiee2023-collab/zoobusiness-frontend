import type { RouteObject } from "react-router-dom";

import { LoginPage } from "@/pages/auth/LoginPage";
import { SignUpPage } from "@/pages/auth/SignUpPage";
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
      title: "AvatraTech | AutoBots",
      shell: "public",
    },
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    handle: {
      title: "Sign up",
      shell: "blank",
    },
  },
  {
    path: "/login",
    element: <LoginPage />,
    handle: {
      title: "Log in",
      shell: "blank",
    },
  },
];
