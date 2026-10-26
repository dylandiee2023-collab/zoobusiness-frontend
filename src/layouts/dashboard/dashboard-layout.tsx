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
      className="min-h-screen w-full overflow-hidden"
      data-sidebar-mode={state.mode}
      style={{ ...dashboardLayoutStyles.root, background: "var(--zb-colors-background)", color: "var(--zb-colors-text)" }}
    >
      {!isMobile && state.mode !== "hidden" ? (
        <button
          className="fixed inset-0 z-[65] border-0 bg-black/40"
          type="button"
          aria-label="Close navigation"
          onClick={() => undefined}
        />
      ) : null}
      <Sidebar />

      <main
        style={{
          ...dashboardLayoutStyles.content,
          marginLeft: isMobile ? 0 : sidebarWidth,
        }}
      >
        <TopBar />
        <div style={{ ...dashboardLayoutStyles.main, paddingTop: isMobile ? 60 : 72, paddingBottom: isMobile ? 96 : 24 }}>{children}</div>
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
