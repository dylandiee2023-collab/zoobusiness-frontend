import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Sidebar, SidebarProvider, useSidebar } from "@/components/layout/sidebar";
import { ContentShellViewport, useContentShell } from "@/content-shell-engine";
import { useResponsive } from "@/responsive";
import { useTheme } from "@/theme/hooks";
import { BottomNavigation } from "@/layouts/app-shell/components/bottom-navigation/BottomNavigation";

const routeTitles: Readonly<Record<string, string>> = {
  "/dashboard": "Home",
  "/pos": "Point of Sale",
  "/products": "Products",
  "/inventory": "Inventory",
  "/warehouses": "Warehouses",
  "/inventory/transfers": "Stock Transfers",
  "/customers": "Customers",
  "/customers/messages": "Customer Messages",
  "/customers/debts": "Customer Debts",
  "/purchases": "Purchases",
  "/settings": "Settings",
  "/profile": "Profile",
  "/ai-assistant": "AI Assistant",
  "/integrations": "Tools",
};

function titleForPath(pathname: string): string {
  return routeTitles[pathname] ?? "Workspace";
}

function DashboardWorkspaceLayoutContent() {
  const location = useLocation();
  const { theme } = useTheme();
  const { isMobile } = useResponsive();
  const { state } = useSidebar();
  const shell = useContentShell();
  const title = titleForPath(location.pathname);
  const sidebarWidth = state.mode === "collapsed" ? 72 : 280;

  // Keep route-driven workspace content in Shell 2. The effect runs on route
  // changes, not every shell state update, so a user can intentionally close it.
  useEffect(() => {
    shell.openShell2({
      id: location.pathname,
      title,
      href: location.pathname,
    });
  }, [location.pathname, shell.openShell2, title]);

  const renderWorkspace = () => (
    <div
      className="zb-dashboard-workspace"
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        minHeight: 0,
        height: "100%",
        background: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      {!isMobile ? (
        <header
          className="zb-dashboard-topbar"
          style={{
            display: "flex",
            alignItems: "center",
            minHeight: theme.componentSizes.topbarHeight,
            paddingInline: theme.spacing.card,
            borderBottom: `1px solid ${theme.colors.border}`,
            background: theme.colors.surface,
          }}
        >
          <strong>{title}</strong>
          <span style={{ marginInlineStart: "auto", color: theme.colors.textSecondary, fontSize: 13 }}>
            ZooBusiness workspace
          </span>
        </header>
      ) : null}
      <main
        className="zb-dashboard-page-content"
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          overflow: "auto",
          padding: theme.spacing.card,
        }}
      >
        <Outlet />
      </main>
    </div>
  );

  return (
    <div
      className="zb-dashboard-layout-root"
      style={{
        width: "100%",
        height: "100dvh",
        minHeight: 0,
        overflow: "hidden",
        background: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <ContentShellViewport
        shell1={<Sidebar />}
        shell1Width={sidebarWidth}
        renderShell2={() => renderWorkspace()}
        renderShell3={() => renderWorkspace()}
      />
      <BottomNavigation />
    </div>
  );
}

export function DashboardWorkspaceLayout() {
  return (
    <SidebarProvider>
      <DashboardWorkspaceLayoutContent />
    </SidebarProvider>
  );
}
