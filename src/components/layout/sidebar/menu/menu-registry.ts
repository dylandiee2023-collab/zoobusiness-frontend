import type { MenuGroup } from "./menu.types";

export const MENU_REGISTRY: readonly MenuGroup[] = [
  {
    id: "main",
    title: "Main",
    icon: "layout-dashboard",
    expanded: true,
    items: [
      { id: "dashboard", title: "Dashboard", icon: "layout-dashboard", route: "/dashboard" },
      { id: "products", title: "Products", icon: "package", route: "/products", permissions: ["product.view"] },
      { id: "inventory", title: "Inventory", icon: "warehouse", route: "/inventory" },
      { id: "sales", title: "Sales", icon: "shopping-cart", route: "/sales" },
      { id: "pos", title: "Point of sale", icon: "store", route: "/pos" },
      { id: "customers", title: "Customers", icon: "users", route: "/customers" },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    icon: "boxes",
    expanded: true,
    items: [
      { id: "orders", title: "Orders", icon: "clipboard-list", route: "/orders" },
      { id: "purchases", title: "Purchasing", icon: "truck", route: "/purchases" },
      { id: "warehouses", title: "Warehouses", icon: "boxes", route: "/warehouses" },
      { id: "expenses", title: "Expenses", icon: "wallet", route: "/expenses" },
    ],
  },
  {
    id: "insights",
    title: "Insights",
    icon: "chart",
    expanded: true,
    items: [
      { id: "reports", title: "Reports", icon: "chart", route: "/reports" },
    ],
  },
  {
    id: "tools",
    title: "Tools & communication",
    icon: "bot",
    expanded: true,
    items: [
      { id: "ai-assistant", title: "AI assistant", icon: "bot", route: "/ai-assistant" },
      { id: "customer-chats", title: "Customer chats", icon: "message-circle", route: "/customers/messages" },
    ],
  },
  {
    id: "workspace",
    title: "Workspace",
    icon: "users",
    expanded: true,
    items: [
      { id: "team", title: "Team & permissions", icon: "user-cog", route: "/team" },
      { id: "integrations", title: "Integrations", icon: "plug", route: "/integrations" },
    ],
  },
];
