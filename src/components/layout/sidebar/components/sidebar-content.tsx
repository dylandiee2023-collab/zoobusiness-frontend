import {
  BarChart3,
  Bell,
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
import { useState } from "react";
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
  box: Package,
  warehouse: Warehouse,
  "shopping-cart": ShoppingCart,
  store: Store,
  users: Users,
  "clipboard-list": ClipboardList,
  receipt: ClipboardList,
  truck: Truck,
  boxes: Boxes,
  wallet: Wallet,
  chart: BarChart3,
  bot: Bot,
  bell: Bell,
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
        pathname === item.route || pathname.startsWith(`${item.route}/`),
    )
    .sort((left, right) => right.route.length - left.route.length)[0]?.route;
}

function containsActiveRoute(item: SidebarItem, activeRoute: string | undefined): boolean {
  if (!activeRoute) return false;
  return flattenItems([item]).some((candidate) => candidate.route === activeRoute);
}

interface SidebarMenuItemProps {
  item: SidebarItem;
  activeRoute: string | undefined;
  collapsed: boolean;
  isMobile: boolean;
  onNavigate: () => void;
  expandedItems: Readonly<Record<string, boolean>>;
  toggleItem: (id: string) => void;
}

function SidebarMenuItem({
  item,
  activeRoute,
  collapsed,
  isMobile,
  onNavigate,
  expandedItems,
  toggleItem,
}: SidebarMenuItemProps) {
  const Icon = itemIcons[item.icon as keyof typeof itemIcons] ?? LayoutDashboard;
  const hasChildren = Boolean(item.children?.length);
  const active = Boolean(item.route && item.route === activeRoute);
  const expanded = expandedItems[item.id] ?? containsActiveRoute(item, activeRoute);

  const children = hasChildren && expanded && !collapsed ? (
    <div className="zb-sidebar-submenu">
      {item.children!.map((child) => (
        <SidebarMenuItem
          key={child.id}
          item={child}
          activeRoute={activeRoute}
          collapsed={false}
          isMobile={isMobile}
          onNavigate={onNavigate}
          expandedItems={expandedItems}
          toggleItem={toggleItem}
        />
      ))}
    </div>
  ) : null;

  return (
    <div className="zb-sidebar-item-wrapper" key={item.id}>
      <div className="zb-sidebar-item-row">
        {item.route ? (
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
            <button
              className="zb-sidebar-link zb-sidebar-parent-toggle"
              type="button"
              aria-label={`${expanded ? "Collapse" : "Expand"} ${item.title} submenu`}
              aria-expanded={expanded}
              onClick={() => toggleItem(item.id)}
            >
              <ChevronDown
                className={expanded ? "" : "is-collapsed"}
                size={15}
                aria-hidden="true"
              />
            </button>
          ) : null}
        ) : hasChildren ? (
          <button
            className="zb-sidebar-link zb-sidebar-parent"
            type="button"
            aria-label={item.title}
            title={collapsed ? item.title : undefined}
            aria-expanded={collapsed ? false : expanded}
            onClick={() => {
              if (collapsed) return;
              toggleItem(item.id);
            }}
          >
            <Icon size={19} aria-hidden="true" />
            {!collapsed ? <span>{item.title}</span> : null}
            {!collapsed ? (
              <ChevronDown
                className={expanded ? "" : "is-collapsed"}
                size={15}
                aria-hidden="true"
              />
            ) : null}
          </button>
        ) : (
          <span
            className="zb-sidebar-link is-disabled"
            aria-disabled="true"
            title={collapsed ? item.title : undefined}
          >
            <Icon size={19} aria-hidden="true" />
            {!collapsed ? <span>{item.title}</span> : null}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export function SidebarContent() {
  const { state, actions } = useSidebar();
  const { isMobile } = useResponsive();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Readonly<Record<string, boolean>>>({});

  const collapsed = state.mode === "collapsed";
  const allItems = state.groups.flatMap((group) => group.items);
  const activeRoute = getActiveRoute(allItems, location.pathname);

  const toggleItem = (id: string) => {
    setExpandedItems((current) => ({
      ...current,
      [id]: !(current[id] ?? containsActiveRoute(
        flattenItems(allItems).find((item) => item.id === id) ?? { id, title: "", icon: "" },
        activeRoute,
      )),
    }));
  };

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
                  expandedItems={expandedItems}
                  toggleItem={toggleItem}
                />
              ))}
            </div>
          ) : null}
        </section>
      ))}
    </nav>
  );
}
