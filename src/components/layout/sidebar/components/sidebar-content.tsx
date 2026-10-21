
import {
  BarChart3,
  Bot,
  Boxes,
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Package,
  Plug,
  Settings,
  ShoppingCart,
  Store,
  Truck,
  UserCog,
  Users,
  Wallet,
  Warehouse,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useResponsive } from "@/responsive";
import { useSidebar } from "../context";
import type { SidebarItem } from "../contracts/sidebar-item";

const itemIcons = {
  "layout-dashboard": LayoutDashboard,
  grid: LayoutDashboard,
  scan: ShoppingCart,
  shoppingBag: ShoppingCart,
  settings: Settings,
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
  messageCircle: MessageCircle,
  mail: Mail,
  "user-cog": UserCog,
  plug: Plug,
} as const;

function flattenItems(items: readonly SidebarItem[]): SidebarItem[] {
  return items.flatMap((item) => [
    item,
    ...(item.children ? flattenItems(item.children) : []),
  ]);
}

function getActiveRoute(
  items: readonly SidebarItem[],
  pathname: string,
): string | undefined {
  return flattenItems(items)
    .filter(
      (item): item is SidebarItem & { route: string } =>
        typeof item.route === "string" && item.route.length > 0,
    )
    .filter(
      (item) =>
        pathname === item.route ||
        pathname.startsWith(`${item.route}/`),
    )
    .sort((left, right) => right.route.length - left.route.length)[0]
    ?.route;
}

interface SidebarMenuItemProps {
  item: SidebarItem;
  activeRoute: string | undefined;
  collapsed: boolean;
  isMobile: boolean;
  onNavigate: () => void;
}

function SidebarMenuItem({
  item,
  activeRoute,
  collapsed,
  isMobile,
  onNavigate,
}: SidebarMenuItemProps) {
  const Icon =
    itemIcons[item.icon as keyof typeof itemIcons] ?? LayoutDashboard;

  const hasChildren = Boolean(item.children?.length);
  const active = Boolean(item.route && item.route === activeRoute);

  if (item.route) {
    return (
      <div className="zb-sidebar-item-wrapper" key={item.id}>
        <Link
          className={`zb-sidebar-link${active ? " is-active" : ""}`}
          to={item.route}
          aria-label={item.title}
          aria-current={active ? "page" : undefined}
          title={collapsed ? item.title : undefined}
          onClick={() => {
            if (isMobile) onNavigate();
          }}
        >
          <Icon size={19} aria-hidden="true" />
          {!collapsed ? <span>{item.title}</span> : null}
        </Link>

        {hasChildren && !collapsed ? (
          <div className="zb-sidebar-submenu">
            {item.children!.map((child) => (
              <SidebarMenuItem
                key={child.id}
                item={child}
                activeRoute={activeRoute}
                collapsed={false}
                isMobile={isMobile}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (!hasChildren) {
    return (
      <div className="zb-sidebar-item-wrapper" key={item.id}>
        <span
          className="zb-sidebar-link is-disabled"
          aria-disabled="true"
          title={collapsed ? item.title : undefined}
        >
          <Icon size={19} aria-hidden="true" />
          {!collapsed ? <span>{item.title}</span> : null}
        </span>
      </div>
    );
  }

  return (
    <div className="zb-sidebar-item-wrapper" key={item.id}>
      <button
        className="zb-sidebar-link zb-sidebar-parent"
        type="button"
        aria-label={item.title}
        title={collapsed ? item.title : undefined}
        aria-expanded="true"
      >
        <Icon size={19} aria-hidden="true" />
        {!collapsed ? <span>{item.title}</span> : null}
        {!collapsed ? (
          <ChevronDown size={15} aria-hidden="true" />
        ) : null}
      </button>

      {!collapsed ? (
        <div className="zb-sidebar-submenu">
          {item.children!.map((child) => (
            <SidebarMenuItem
              key={child.id}
              item={child}
              activeRoute={activeRoute}
              collapsed={false}
              isMobile={isMobile}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function SidebarContent() {
  const { state, actions } = useSidebar();
  const { isMobile } = useResponsive();
  const location = useLocation();

  const collapsed = state.mode === "collapsed";

  const allItems = state.groups.flatMap((group) => group.items);
  const activeRoute = getActiveRoute(allItems, location.pathname);

  if (state.mode === "hidden") return null;

  return (
    <nav className="zb-sidebar-nav" aria-label="Sidebar navigation">
      {state.groups.map((group) => (
        <section
          className="zb-sidebar-group"
          data-group-id={group.id}
          key={group.id}
        >
          {!collapsed && group.title ? (
            <button
              className="zb-sidebar-group-toggle"
              type="button"
              onClick={() => actions.toggleGroup(group.id)}
              aria-expanded={group.expanded}
            >
              <span>{group.title}</span>
              <ChevronDown
                className={group.expanded ? "" : "is-collapsed"}
                size={15}
                aria-hidden="true"
              />
            </button>
          ) : null}

          {group.expanded || collapsed ? (
            <div className="zb-sidebar-items">
              {group.items.map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  item={item}
                  activeRoute={activeRoute}
                  collapsed={collapsed}
                  isMobile={isMobile}
                  onNavigate={actions.hide}
                />
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </nav>
  );
}
