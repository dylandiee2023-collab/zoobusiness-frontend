import { ChevronDown, LayoutDashboard, Package, ShoppingCart, Warehouse } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useSidebar } from "../context";
import { useResponsive } from "@/responsive";

const itemIcons = {
  "layout-dashboard": LayoutDashboard,
  package: Package,
  warehouse: Warehouse,
  "shopping-cart": ShoppingCart,
} as const;

export function SidebarContent() {
  const { state, actions } = useSidebar();
  const { isMobile } = useResponsive();
  const location = useLocation();

  if (state.mode === "hidden") return null;

  return (
    <nav className="zb-sidebar-nav" aria-label="Sidebar navigation">
      {state.groups.map((group) => (
        <section className="zb-sidebar-group" key={group.id}>
          {state.mode === "expanded" || isMobile ? (
            <button
              className="zb-sidebar-group-toggle"
              type="button"
              onClick={() => actions.toggleGroup(group.id)}
              aria-expanded={group.expanded}
            >
              <span>{group.title}</span>
              <ChevronDown size={15} aria-hidden="true" />
            </button>
          ) : null}

          {group.expanded ? (
            <div className="zb-sidebar-items">
              {group.items.map((item) => {
                const Icon = itemIcons[item.icon as keyof typeof itemIcons] ?? LayoutDashboard;
                const active =
                  location.pathname === item.route ||
                  (item.route !== "/" && location.pathname.startsWith(item.route + "/"));

                return (
                  <Link
                    className={`zb-sidebar-link${active ? " is-active" : ""}`}
                    key={item.id}
                    to={item.route === "/" ? "/dashboard" : item.route}
                    aria-label={item.title}
                    aria-current={active ? "page" : undefined}
                    title={state.mode === "collapsed" ? item.title : undefined}
                    onClick={() => {
                      if (isMobile) actions.hide();
                    }}
                  >
                    <Icon size={19} aria-hidden="true" />
                    {state.mode === "expanded" || isMobile ? (
                      <span>{item.title}</span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </section>
      ))}
    </nav>
  );
}
