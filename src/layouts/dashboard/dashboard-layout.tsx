import type { DashboardLayoutProps } from "./dashboard-layout.types";

import { dashboardLayoutStyles } from "./dashboard-layout.styles";

import {
  Sidebar,
  SidebarProvider,
} from "@/components/layout/sidebar";

import {
  TopBar,
  TopBarProvider,
} from "@/components/layout/top-bar";

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <TopBarProvider>
        <div style={dashboardLayoutStyles.root}>
          <aside style={dashboardLayoutStyles.sidebar}>
            <Sidebar />
          </aside>

          <div style={dashboardLayoutStyles.content}>
            <TopBar />

            <main style={dashboardLayoutStyles.main}>
              {children}
            </main>
          </div>
        </div>
      </TopBarProvider>
    </SidebarProvider>
  );
}
