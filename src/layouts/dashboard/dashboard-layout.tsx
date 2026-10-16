import { MessageCircle, Bot, Home, ShoppingCart, Package, Warehouse, MoreHorizontal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/sidebar";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/sidebar/context";

import { TopBar } from "@/components/layout/top-bar";
import { TopBarProvider } from "@/components/layout/top-bar/context";

import type { DashboardLayoutProps } from "./dashboard-layout.types";
import "./dashboard-layout.css";
import { dashboardLayoutStyles } from "./dashboard-layout.styles";

function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const { state, actions } = useSidebar();
  const location = useLocation();

  const sidebarWidth =
    state.mode === "expanded" ? 280 : state.mode === "collapsed" ? 72 : 0;

  return (
    <div
      className="dashboard-layout-root"
      data-sidebar-mode={state.mode}
      style={{
        ...dashboardLayoutStyles.root,
      }}
    >
      {state.mode !== "hidden" ? (
        <button
          className="dashboard-layout-backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => {
            if (window.matchMedia("(max-width: 767px)").matches) {
              actions.hide();
            }
          }}
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
      <nav className="zb-mobile-bottom-nav" aria-label="Main navigation">
        <Link to="/dashboard" className={location.pathname === "/dashboard" || location.pathname === "/" ? "is-active" : ""} aria-current={location.pathname === "/dashboard" || location.pathname === "/" ? "page" : undefined}>
          <Home size={22} aria-hidden="true" /><span>Home</span>
        </Link>
        <Link to="/sales" className={location.pathname.startsWith("/sales") ? "is-active" : ""} aria-current={location.pathname.startsWith("/sales") ? "page" : undefined}>
          <ShoppingCart size={22} aria-hidden="true" /><span>Sales</span>
        </Link>
        <Link to="/products" className={location.pathname.startsWith("/products") ? "is-active" : ""} aria-current={location.pathname.startsWith("/products") ? "page" : undefined}>
          <Package size={22} aria-hidden="true" /><span>Products</span>
        </Link>
        <Link to="/inventory" className={location.pathname.startsWith("/inventory") ? "is-active" : ""} aria-current={location.pathname.startsWith("/inventory") ? "page" : undefined}>
          <Warehouse size={22} aria-hidden="true" /><span>Inventory</span>
        </Link>
        <Link to="/settings" className={location.pathname.startsWith("/settings") || location.pathname.startsWith("/profile") ? "is-active" : ""} aria-current={location.pathname.startsWith("/settings") || location.pathname.startsWith("/profile") ? "page" : undefined}>
          <MoreHorizontal size={22} aria-hidden="true" /><span>More</span>
        </Link>
      </nav>
      <nav className="zb-floating-support" aria-label="Customer support and AI">
          <Link to="/customers/messages" aria-label="Customer chats" title="Customer chats">
            <MessageCircle size={20} aria-hidden="true" /><span>Customer chats</span>
          </Link>
          <Link to="/ai-assistant" aria-label="AI assistant" title="AI assistant">
            <Bot size={20} aria-hidden="true" /><span>AI assistant</span>
          </Link>
        </nav>
      </main>
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
