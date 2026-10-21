import type { RouteObject } from "react-router-dom";

import { LoginPage } from "@/pages/auth/LoginPage";
import { SignUpPage } from "@/pages/auth/SignUpPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { EmailVerificationPage } from "@/pages/auth/EmailVerificationPage";
import { BusinessSetupPage } from "@/pages/auth/BusinessSetupPage";
import { WelcomePage } from "@/pages/welcome/WelcomePage";
import { AcademyPage } from "@/pages/academy/AcademyPage";
import { FeaturesPage } from "@/pages/features/FeaturesPage";
import { PricingPage } from "@/pages/pricing/PricingPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { ProductsPage } from "@/pages/products/ProductsPage";
import { WorkspaceSettingsPage } from "@/pages/settings/WorkspaceSettingsPage";
import { ModuleShellPage } from "@/pages/modules/ModuleShellPage";
import { DashboardWorkspaceLayout } from "@/layouts/app-shell/DashboardWorkspaceLayout";

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

const workspaceRoutes: AppRouteObject[] = [
  {
    path: "/products",
    element: <ProductsPage />,
    handle: {
      title: "Products | ZooBusiness",
      shell: "dashboard",
      requiresAuthentication: true,
      permissions: ["product.view"],
    },
  },
  {
    path: "/settings",
    element: <WorkspaceSettingsPage />,
    handle: {
      title: "Settings | ZooBusiness",
      shell: "dashboard",
      requiresAuthentication: true,
    },
  },
  {
    path: "/profile",
    element: <WorkspaceSettingsPage />,
    handle: {
      title: "Workspace settings | ZooBusiness",
      shell: "dashboard",
      requiresAuthentication: true,
    },
  },
  ...[
    "/inventory",
    "/sales",
    "/pos",
    "/customers",
    "/customers/messages",
    "/customers/debts",
    "/orders",
    "/purchases",
    "/warehouses",
    "/inventory/transfers",
    "/expenses",
    "/reports",
    "/ai-assistant",
    "/team",
    "/integrations",
  ].map((path): AppRouteObject => ({
    path,
    element: <ModuleShellPage />,
    handle: {
      title: "Workspace module | ZooBusiness",
      shell: "dashboard",
      requiresAuthentication: true,
    },
  })),
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

const publicAndAuthRoutes: AppRouteObject[] = [
  {
    path: "/",
    element: <WelcomePage />,
    handle: { title: "ZooBusiness | AvatraTech", shell: "public" },
  },
  {
    path: "/features",
    element: <FeaturesPage />,
    handle: { title: "Features | ZooBusiness", shell: "public" },
  },
  {
    path: "/academy",
    element: <AcademyPage />,
    handle: { title: "Academy | AvatraTech", shell: "public" },
  },
  {
    path: "/pricing",
    element: <PricingPage />,
    handle: { title: "Pricing | ZooBusiness", shell: "public" },
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    handle: { title: "Sign up", shell: "blank" },
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    handle: { title: "Forgot password", shell: "blank" },
  },
  {
    path: "/verify-email",
    element: <EmailVerificationPage />,
    handle: { title: "Verify email", shell: "blank" },
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
    handle: { title: "Reset password", shell: "blank" },
  },
  {
    path: "/business-setup",
    element: <BusinessSetupPage />,
    handle: {
      title: "Business setup",
      shell: "blank",
      requiresAuthentication: true,
    },
  },
  {
    path: "/login",
    element: <LoginPage />,
    handle: { title: "Log in", shell: "blank" },
  },
];

export const routes: AppRouteObject[] = [
  {
    element: <DashboardWorkspaceLayout />,
    children: workspaceRoutes,
  },
  ...publicAndAuthRoutes,
];
