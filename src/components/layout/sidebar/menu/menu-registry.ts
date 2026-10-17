import type { MenuGroup } from "./menu.types";

/** Keep the desktop sidebar intentionally minimal; more destinations are added with their pages. */
export const MENU_REGISTRY: readonly MenuGroup[] = [
  {
    id: "main",
    title: "Main",
    icon: "layout-dashboard",
    expanded: true,
    items: [
      { id: "dashboard", title: "Dashboard", icon: "layout-dashboard", route: "/dashboard" },
      { id: "products", title: "Products", icon: "package", route: "/products", permissions: ["product.view"] },
    ],
  },
];
