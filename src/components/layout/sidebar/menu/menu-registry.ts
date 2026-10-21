import { navigationConfig } from "@/dashboard/navigation/navigation.config";
import type { NavigationItem } from "@/dashboard/navigation/navigation.types";
import type { MenuGroup, MenuItem } from "./menu.types";

function toSidebarItem(item: NavigationItem): MenuItem {
  return {
    id: item.id,
    title: item.label,
    icon: item.icon,
    ...(item.route ? { route: item.route } : {}),
    ...(item.permission ? { permissions: [item.permission] } : {}),
    ...(item.children ? { children: item.children.map(toSidebarItem) } : {}),
  };
}

const dailyNavigation = navigationConfig
  .filter((item) => item.placement === "sidebar")
  .map(toSidebarItem);

/**
 * Sidebar navigation is derived from the canonical navigation tree.
 * Route-less parents are valid: they group destinations and toggle nested menus.
 */
export const MENU_REGISTRY: readonly MenuGroup[] = [
  {
    id: "daily",
    title: "",
    icon: "dashboard",
    expanded: true,
    items: dailyNavigation,
  },
];
