import type { NavigationItem } from "./navigation.types";

/**
 * Canonical navigation tree. Top-level entries power the application menu;
 * children describe Shell 1 navigation and nested tool/channel destinations.
 * Module pages and content rendering remain outside this registry.
 */
export const navigationConfig: readonly NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    icon: "grid",
    route: "/dashboard",
    permission: "report.view",
    placement: "sidebar",
  },
  {
    id: "pos",
    label: "POS",
    icon: "scan",
    route: "/pos",
    permission: "pos.use",
    placement: "sidebar",
  },
  {
    id: "purchases",
    label: "Purchases",
    icon: "shoppingBag",
    route: "/purchases",
    permission: "order.view",
    placement: "sidebar",
    children: [
      { id: "purchase-orders", label: "Purchase Orders", icon: "receipt", permission: "order.view", placement: "sidebar" },
      { id: "suppliers", label: "Suppliers", icon: "shoppingBag", permission: "supplier.view", placement: "sidebar" },
      { id: "receiving", label: "Receive Stock", icon: "boxes", permission: "inventory.manage", placement: "sidebar" },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: "warehouse",
    route: "/inventory",
    permission: "inventory.view",
    placement: "sidebar",
    children: [
      { id: "products", label: "Products", icon: "box", route: "/products", permission: "product.view", placement: "sidebar" },
      { id: "stock", label: "Stock", icon: "boxes", route: "/inventory", permission: "inventory.view", placement: "sidebar" },
      { id: "warehouses", label: "Warehouses", icon: "warehouse", route: "/warehouses", permission: "inventory.view", placement: "sidebar" },
      { id: "transfers", label: "Transfers", icon: "truck", route: "/inventory/transfers", permission: "inventory.manage", placement: "sidebar" },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    icon: "users",
    route: "/customers",
    permission: "customer.view",
    placement: "sidebar",
    children: [
      { id: "customer-directory", label: "Customer Directory", icon: "users", route: "/customers", permission: "customer.view", placement: "sidebar" },
      { id: "customer-debts", label: "Debts", icon: "receipt", route: "/customers/debts", permission: "customer.view", placement: "sidebar" },
      { id: "customer-messages", label: "Messages", icon: "bell", route: "/customers/messages", permission: "customer.view", placement: "sidebar" },
    ],
  },
  {
    id: "ai",
    label: "AI",
    icon: "bot",
    route: "/ai-assistant",
    permission: "ai.use",
    placement: "sidebar",
    children: [
      { id: "ai-assistant", label: "Assistant", icon: "bot", route: "/ai-assistant", permission: "ai.use", placement: "sidebar" },
      { id: "ai-insights", label: "Business Insights", icon: "chart", permission: "ai.use", placement: "sidebar" },
      { id: "ai-automation", label: "Automation", icon: "settings", permission: "ai.use", placement: "sidebar" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "settings",
    route: "/integrations",
    placement: "sidebar",
    children: [
      { id: "ads", label: "Ads", icon: "chart", placement: "sidebar" },
      { id: "plugins", label: "Plugins", icon: "settings", placement: "sidebar" },
      {
        id: "channels",
        label: "Channels",
        icon: "bell",
        placement: "sidebar",
        children: [
          { id: "whatsapp", label: "WhatsApp", icon: "bell", placement: "sidebar" },
          { id: "telegram", label: "Telegram", icon: "bell", placement: "sidebar" },
          { id: "messenger", label: "Messenger", icon: "bell", placement: "sidebar" },
          { id: "email", label: "Email", icon: "bell", placement: "sidebar" },
        ],
      },
    ],
  },
  {
    id: "profile",
    label: "Profile",
    icon: "users",
    route: "/profile",
    placement: "user-menu",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    route: "/settings",
    permission: "workspace.manage",
    placement: "user-menu",
  },
];
