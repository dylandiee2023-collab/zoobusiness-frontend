import { Sidebar } from "@/components/layout/sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/sidebar/context";
import { TopBar } from "@/components/layout/top-bar";
import { TopBarProvider } from "@/components/layout/top-bar/context";
import { useResponsive } from "@/responsive";
import { BottomNavigation } from "@/layouts/app-shell/components/bottom-navigation/BottomNavigation";

import type { DashboardLayoutProps } from "./dashboard-layout.types";
import { dashboardLayoutStyles } from "./dashboard-layout.styles";

function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const { state } = useSidebar();
  const { isMobile } = useResponsive();

  const sidebarWidth = isMobile
    ? 0
    : state.mode === "expanded"
      ? 280
      : state.mode === "collapsed"
        ? 72
        : 0;

  return (
    <div
      className="dashboard-layout-root"
      data-sidebar-mode={state.mode}
      style={{ ...dashboardLayoutStyles.root }}
    >
      {!isMobile && state.mode !== "hidden" ? (
        <button
          className="dashboard-layout-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => undefined}
        />
      ) : null}
      <Sidebar />

      <main
        style={{
          ...dashboardLayoutStyles.content,
          marginLeft: sidebarWidth,
        }}
      >
        <TopBar />
        <div style={dashboardLayoutStyles.main}>{children}</div>
      </main>

      <BottomNavigation />
    </div>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <TopBarProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </TopBarProvider>
    </SidebarProvider>
  );
}
