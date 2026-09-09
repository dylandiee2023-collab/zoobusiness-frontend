import { useMemo, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { usePlatform } from "@/platform/providers/use-platform";
import { useWorkspace } from "@/workspace/providers/workspace-provider";

import { navigationConfig } from "../navigation/navigation.config";
import { resolveNavigation } from "../navigation/navigation.resolver";
import type { NavigationItem } from "../navigation/navigation.types";
import "./dashboard-shell.css";

// Phase 7A uses the permissions already defined by AutoBots RBAC.
// The runtime permission endpoint will replace this adapter once the API exposes
// the authenticated workspace permission set to the frontend.
const retailPermissions = new Set([
  "pos.use",
  "order.view",
  "customer.view",
  "product.view",
  "inventory.view",
  "inventory.manage",
  "payment.view",
  "report.view",
  "ai.use",
  "workspace.manage",
]);

function NavigationItems({ items, onNavigate }: { items: readonly NavigationItem[]; onNavigate?: () => void }) {
  return items.map((item) => (
    <div className="zb-shell-nav-group" key={item.id}>
      {item.route ? (
        <NavLink
          className={({ isActive }) => `zb-shell-nav-item${isActive ? " is-active" : ""}`}
          to={item.route}
          onClick={onNavigate}
          title={item.label}
        >
          <span className={`zb-shell-icon zb-icon-${item.icon}`} aria-hidden="true" />
          <span className="zb-shell-nav-label">{item.label}</span>
        </NavLink>
      ) : (
        <div className="zb-shell-nav-section">
          <span className={`zb-shell-icon zb-icon-${item.icon}`} aria-hidden="true" />
          <span className="zb-shell-nav-label">{item.label}</span>
        </div>
      )}
      {item.children ? <NavigationItems items={item.children} onNavigate={onNavigate} /> : null}
    </div>
  ));
}

export function DashboardShell() {
  const platform = usePlatform();
  const { workspace } = useWorkspace();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = useMemo(
    () =>
      resolveNavigation(navigationConfig, {
        businessCategory: "retail",
        permissions: retailPermissions,
      }),
    [],
  );
  const sidebarItems = navigation.filter((item) => item.placement === "sidebar");
  const userName = platform.authentication.user?.name?.trim() || "Account";
  const workspaceName = workspace?.name?.trim() || "My Business";

  return (
    <div className={`zb-dashboard-shell${sidebarCollapsed ? " is-collapsed" : ""}`}>
      {mobileOpen ? <button className="zb-shell-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} /> : null}

      <aside className={`zb-shell-sidebar${mobileOpen ? " is-mobile-open" : ""}`}>
        <div className="zb-shell-brand">
          <span className="zb-shell-brand-mark">Z</span>
          <div className="zb-shell-brand-copy">
            <strong>ZooBusiness</strong>
            <span>Retail operations</span>
          </div>
        </div>
        <nav className="zb-shell-nav" aria-label="Business navigation">
          <NavigationItems items={sidebarItems} onNavigate={() => setMobileOpen(false)} />
        </nav>
        <button className="zb-shell-collapse" onClick={() => setSidebarCollapsed((value) => !value)} aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
          <span aria-hidden="true">{sidebarCollapsed ? "→" : "←"}</span>
          <span className="zb-shell-nav-label">{sidebarCollapsed ? "Expand" : "Collapse"}</span>
        </button>
      </aside>

      <div className="zb-shell-main">
        <header className="zb-shell-topbar">
          <div className="zb-shell-topbar-left">
            <button className="zb-shell-mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation">☰</button>
            <div className="zb-shell-mobile-brand">ZooBusiness</div>
            <button className="zb-shell-workspace" type="button" aria-label="Select workspace">{workspaceName} <span>⌄</span></button>
          </div>
          <div className="zb-shell-topbar-actions">
            <button type="button" aria-label="Search">⌕</button>
            <button type="button" aria-label="Notifications">🔔</button>
            <button className="zb-shell-user" type="button">{userName} <span>⌄</span></button>
          </div>
        </header>
        <main className="zb-shell-content">
          <Outlet />
        </main>
      </div>

      <nav className="zb-shell-mobile-nav" aria-label="Mobile shortcuts">
        <NavLink to="/dashboard"><span>⌂</span><small>Home</small></NavLink>
        <button type="button" onClick={() => setMobileOpen(true)}><span>☰</span><small>More</small></button>
      </nav>
    </div>
  );
}
