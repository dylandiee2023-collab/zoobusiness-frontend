import type { MenuGroup } from "./menu.types";

export const MENU_REGISTRY: readonly MenuGroup[] = [
  {
    id: "main",
    title: "Main",
    icon: "layout-dashboard",
    expanded: true,

    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        icon: "layout-dashboard",
        route: "/",
      },
      {
        id: "products",
        title: "Products",
        icon: "package",
        route: "/products",
      },
      {
        id: "inventory",
        title: "Inventory",
        icon: "warehouse",
        route: "/inventory",
      },
      {
        id: "sales",
        title: "Sales",
        icon: "shopping-cart",
        route: "/sales",
      },
    ],
  },
];
