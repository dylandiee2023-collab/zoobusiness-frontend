import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { navigationConfig } from "../navigation/navigation.config";
import { resolveNavigation } from "../navigation/navigation.resolver";
import type { NavigationItem } from "../navigation/navigation.types";
import "./dashboard-shell.css";

const retailPermissions = new Set([
  "pos.use",
  "order.view",
  "customer.view",
  "product.view",
  "inventory.view",
  "inventory.manage",
  "payment.view",
  "expense.view",
  "report.view",
  "ai.use",
  "workspace.manage",
  "purchase.view",
]);

function NavigationItems({ items, onNavigate }: { items: readonly NavigationItem[]; onNavigate?: () => void }) {
  return items.map((item) => (
    <div className="zb-shell-nav-group" key={item.id}>
      {item.route ? (
        <Link className="zb-shell-nav-item" to={item.route} onClick={onNavigate} title={item.label}>
          <span className={`zb-shell-icon zb-icon-${item.icon}`} aria-hidden="true" />
          <span className="zb-shell-nav-label">{item.label}</span>
        </Link>
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigation = resolveNavigation(navigationConfig, {
    businessCategory: "retail",
    permissions: retailPermissions,
  });
  const sidebarItems = navigation.filter((item) => item.placement === "sidebar");

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
            <button className="zb-shell-workspace" type="button" aria-label="Select workspace">My Business <span>⌄</span></button>
          </div>
          <div className="zb-shell-topbar-actions">
            <button type="button" aria-label="Search">⌕</button>
            <button type="button" aria-label="Notifications">🔔</button>
            <button className="zb-shell-user" type="button">Dylan <span>⌄</span></button>
          </div>
        </header>
        <main className="zb-shell-content">
          <Outlet />
        </main>
      </div>

      <nav className="zb-shell-mobile-nav" aria-label="Mobile shortcuts">
        <Link to="/dashboard"><span>⌂</span><small>Home</small></Link>
        <Link to="/pos"><span>▣</span><small>Sales</small></Link>
        <Link to="/inventory"><span>▤</span><small>Stock</small></Link>
        <button type="button" onClick={() => setMobileOpen(true)}><span>☰</span><small>More</small></button>
      </nav>
    </div>
  );
}
