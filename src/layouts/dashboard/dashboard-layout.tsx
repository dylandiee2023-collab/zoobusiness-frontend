import type {
  DashboardLayoutProps,
} from "./dashboard-layout.types";

import {
  dashboardLayoutStyles,
} from "./dashboard-layout.styles";




export function DashboardLayout({
  children,
}: DashboardLayoutProps) {





  return (
    <div
      style={
        dashboardLayoutStyles.root
      }
    >
      <aside
        style={
          dashboardLayoutStyles.sidebar
        }
      >
        Sidebar
      </aside>

      <main
        style={
          dashboardLayoutStyles.content
        }
      >
        {children}
      </main>
    </div>
  );
}