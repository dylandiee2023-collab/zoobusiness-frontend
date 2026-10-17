import {
  BarChart3,
  Bot,
  Boxes,
  ClipboardList,
  ChevronDown,
  LayoutDashboard,
  MessageCircle,
  Package,
  Plug,
  ShoppingCart,
  Store,
  Truck,
  UserCog,
  Users,
  Wallet,
  Warehouse,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useSidebar } from "../context";
import { useResponsive } from "@/responsive";

const itemIcons = {
  "layout-dashboard": LayoutDashboard,
  package: Package,
  warehouse: Warehouse,
  "shopping-cart": ShoppingCart,
  store: Store,
  users: Users,
  "clipboard-list": ClipboardList,
  truck: Truck,
  boxes: Boxes,
  wallet: Wallet,
  chart: BarChart3,
  bot: Bot,
  "message-circle": MessageCircle,
  "user-cog": UserCog,
  plug: Plug,
} as const;

export function SidebarContent() {
  const { state, actions } = useSidebar();
  const { isMobile } = useResponsive();
  const location = useLocation();
  const collapsed = state.mode === "collapsed";
  const activeRoute = state.groups
    .flatMap((group) => group.items)
    .filter((item) => location.pathname === item.route || location.pathname.startsWith(item.route + "/"))
    .sort((left, right) => right.route.length - left.route.length)[0]?.route;

  if (state.mode === "hidden") return null;

  return (
    <nav className="zb-sidebar-nav" aria-label="Sidebar navigation">
      {state.groups.map((group) => (
        <section className="zb-sidebar-group" key={group.id}>
          {!collapsed ? (
            <button
              className="zb-sidebar-group-toggle"
              type="button"
              onClick={() => actions.toggleGroup(group.id)}
              aria-expanded={group.expanded}
            >
              <span>{group.title}</span>
              <ChevronDown className={group.expanded ? "" : "is-collapsed"} size={15} aria-hidden="true" />
            </button>
          ) : null}

          {group.expanded || collapsed ? (
            <div className="zb-sidebar-items">
              {group.items.map((item) => {
                const Icon = itemIcons[item.icon as keyof typeof itemIcons] ?? LayoutDashboard;
                const active = item.route === activeRoute;

                return (
                  <Link
                    className={`zb-sidebar-link${active ? " is-active" : ""}`}
                    key={item.id}
                    to={item.route}
                    aria-label={item.title}
                    aria-current={active ? "page" : undefined}
                    title={collapsed ? item.title : undefined}
                    onClick={() => {
                      if (isMobile) actions.hide();
                    }}
                  >
                    <Icon size={19} aria-hidden="true" />
                    {!collapsed ? <span>{item.title}</span> : null}
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
