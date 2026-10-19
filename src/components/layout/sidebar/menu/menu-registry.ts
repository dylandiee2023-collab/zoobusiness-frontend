import type { MenuGroup } from "./menu.types";

/**
 * Canonical primary navigation for the authenticated workspace.
 * Feature pages remain module-owned; this registry only defines destinations
 * and the permissions required to reveal them.
 */
export const MENU_REGISTRY: readonly MenuGroup[] = [
  {
    id: "daily",
    title: "",
    icon: "layout-dashboard",
    expanded: true,
    items: [
      {
        id: "home",
        title: "Home",
        icon: "layout-dashboard",
        route: "/dashboard",
        permissions: ["report.view"],
      },
      {
        id: "pos",
        title: "POS",
        icon: "shopping-cart",
        route: "/pos",
        permissions: ["pos.use"],
      },
      {
        id: "purchases",
        title: "Purchases",
        icon: "shopping-cart",
        route: "/purchases",
        permissions: ["order.view"],
      },
      {
        id: "inventory",
        title: "Inventory",
        icon: "warehouse",
        route: "/inventory",
        permissions: ["inventory.view"],
      },
      {
        id: "customers",
        title: "Customers",
        icon: "users",
        route: "/customers",
        permissions: ["customer.view"],
      },
      {
        id: "ai",
        title: "AI",
        icon: "bot",
        route: "/ai-assistant",
        permissions: ["ai.use"],
      },
      {
        id: "tools",
        title: "Tools",
        icon: "plug",
        route: "/integrations",
      },
    ],
  },
  {
    id: "account",
    title: "",
    icon: "user-cog",
    expanded: true,
    items: [
      {
        id: "profile",
        title: "Profile",
        icon: "user-cog",
        route: "/profile",
      },
      {
        id: "settings",
        title: "Settings",
        icon: "user-cog",
        route: "/settings",
        permissions: ["workspace.manage"],
      },
    ],
  },
];
