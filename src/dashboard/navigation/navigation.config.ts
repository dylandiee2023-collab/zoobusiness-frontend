import type { NavigationItem } from "./navigation.types";

export const navigationConfig: readonly NavigationItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "grid",
    route: "/dashboard",
    placement: "sidebar",
  },
  {
    id: "sales",
    label: "Sales",
    icon: "cart",
    placement: "sidebar",
    children: [
      { id: "pos", label: "POS", icon: "scan", route: "/pos", permission: "pos.use", placement: "sidebar" },
      { id: "orders", label: "Orders", icon: "receipt", route: "/orders", permission: "order.view", placement: "sidebar" },
      { id: "customers", label: "Customers", icon: "users", route: "/customers", permission: "customer.view", placement: "sidebar" },
    ],
  },
  {
    id: "catalog",
    label: "Catalog",
    icon: "package",
    placement: "sidebar",
    children: [
      { id: "products", label: "Products", icon: "box", route: "/products", permission: "product.view", placement: "sidebar" },
      { id: "categories", label: "Categories", icon: "tags", route: "/products/categories", permission: "product.view", placement: "sidebar" },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: "warehouse",
    placement: "sidebar",
    children: [
      { id: "stock", label: "Stock", icon: "boxes", route: "/inventory", permission: "inventory.view", placement: "sidebar" },
      { id: "transfers", label: "Transfers", icon: "truck", route: "/inventory/transfers", permission: "inventory.manage", placement: "sidebar" },
    ],
  },
  { id: "purchases", label: "Purchases", icon: "shopping-bag", route: "/purchases", permission: "order.view", placement: "sidebar" },
  { id: "payments", label: "Payments", icon: "credit-card", route: "/payments", permission: "payment.view", placement: "sidebar" },
  { id: "reports", label: "Reports", icon: "chart", route: "/reports", permission: "report.view", placement: "sidebar" },
  { id: "autobots", label: "AutoBots", icon: "bot", route: "/autobots", permission: "ai.use", placement: "sidebar" },
  { id: "notifications", label: "Notifications", icon: "bell", placement: "topbar" },
  { id: "settings", label: "Settings", icon: "settings", route: "/settings", permission: "workspace.manage", placement: "user-menu" },
];
