import { navigationConfig } from "@/dashboard/navigation/navigation.config";
import type { MenuGroup, MenuItem } from "./menu.types";

function toSidebarItem(item: (typeof navigationConfig)[number]): MenuItem {
  return {
    id: item.id,
    title: item.label,
    icon: item.icon,
    route: item.route ?? "/dashboard",
    ...(item.permission ? { permissions: [item.permission] } : {}),
  };
}

const dailyNavigation = navigationConfig
  .filter((item) => item.placement === "sidebar")
  .map(toSidebarItem);

const accountNavigation = navigationConfig
  .filter((item) => item.placement === "user-menu")
  .map(toSidebarItem);

/**
 * The sidebar is a compact projection of the canonical navigation tree.
 * Nested Shell 1 destinations live in navigationConfig.children.
 */
export const MENU_REGISTRY: readonly MenuGroup[] = [
  {
    id: "daily",
    title: "",
    icon: "dashboard",
    expanded: true,
    items: dailyNavigation,
  },
  {
    id: "account",
    title: "",
    icon: "users",
    expanded: true,
    items: accountNavigation,
  },
];
