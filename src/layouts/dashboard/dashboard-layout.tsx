import { MessageCircle, Home, ShoppingCart, Plus, Warehouse, UserRound, Wrench } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/sidebar/context";

import { TopBar } from "@/components/layout/top-bar";
import { TopBarProvider } from "@/components/layout/top-bar/context";
import { useResponsive } from "@/responsive";

import type { DashboardLayoutProps } from "./dashboard-layout.types";
import "./dashboard-layout.css";
import { dashboardLayoutStyles } from "./dashboard-layout.styles";

function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const { isMobile } = useResponsive();

  const sidebarWidth = isMobile ? 0 : state.mode === "expanded" ? 280 : state.mode === "collapsed" ? 72 : 0;

  return (
    <div
      className="dashboard-layout-root"
      data-sidebar-mode={state.mode}
      style={{
        ...dashboardLayoutStyles.root,
      }}
    >
      {!isMobile && state.mode !== "hidden" ? (
        <button className="dashboard-layout-backdrop" type="button" aria-label="Close navigation" onClick={() => {}} />
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
      <nav className="zb-mobile-bottom-nav" aria-label="Main navigation">
        <Link to="/dashboard" className={location.pathname === "/dashboard" || location.pathname === "/" ? "is-active" : ""} aria-current={location.pathname === "/dashboard" || location.pathname === "/" ? "page" : undefined}>
          <Home size={22} aria-hidden="true" /><span>Home</span>
        </Link>
        <Link to="/inventory" className={location.pathname.startsWith("/inventory") ? "is-active" : ""} aria-current={location.pathname.startsWith("/inventory") ? "page" : undefined}>
          <Warehouse size={22} aria-hidden="true" /><span>Inventory</span>
        </Link>
        <Link to="/ai-assistant" className={location.pathname.startsWith("/ai-assistant") ? "is-active" : ""} aria-current={location.pathname.startsWith("/ai-assistant") ? "page" : undefined}>
          <Wrench size={22} aria-hidden="true" /><span>Tools</span>
        </Link>
        <Link to="/profile" className={location.pathname.startsWith("/profile") || location.pathname.startsWith("/settings") ? "is-active" : ""} aria-current={location.pathname.startsWith("/profile") || location.pathname.startsWith("/settings") ? "page" : undefined}>
          <UserRound size={22} aria-hidden="true" /><span>Profile</span>
        </Link>
      </nav>
      <nav className="zb-floating-support" aria-label="Customer support and AI">
          <Link to="/customers/messages" aria-label="Customer chats" title="Customer chats">
            <MessageCircle size={20} aria-hidden="true" /><span>Customer chats</span>
          </Link>
          <Link to="/pos" className="zb-floating-pos" aria-label="Open POS" title="Open POS">
            <span className="zb-floating-pos-icon"><ShoppingCart size={20} aria-hidden="true" /><Plus size={12} aria-hidden="true" /></span><span>POS</span>
          </Link>
        </nav>
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
