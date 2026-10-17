import { ArrowUpRight, Construction } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { DashboardLayout } from "@/layouts/dashboard";

const MODULES: Record<string, { title: string; group: string; description: string; tasks: string[] }> = {
  "/inventory": { title: "Inventory", group: "Main", description: "Track stock, stock movements, low-stock alerts and stock health.", tasks: ["Stock overview", "Stock movements", "Low-stock monitoring"] },
  "/sales": { title: "Sales", group: "Main", description: "Review sales transactions, receipts, returns and payment status.", tasks: ["Sales register", "Returns and adjustments", "Payment status"] },
  "/pos": { title: "Point of sale", group: "Main", description: "A workspace for creating sales and taking payments.", tasks: ["Current sale", "Cart and quantities", "Payment and receipt"] },
  "/customers": { title: "Customers", group: "Main", description: "Keep customer records, contacts and purchase history together.", tasks: ["Customer directory", "Purchase history", "Customer balances"] },
  "/customers/messages": { title: "Customer chats", group: "Tools & communication", description: "A shared place for customer conversations and order follow-up.", tasks: ["Conversation inbox", "Order context", "Reply status"] },
  "/orders": { title: "Orders", group: "Operations", description: "Follow an order from draft through fulfilment and payment.", tasks: ["Order pipeline", "Fulfilment status", "Payment status"] },
  "/purchases": { title: "Purchasing", group: "Operations", description: "Manage purchase orders and the receiving workflow separately from product setup.", tasks: ["Purchase orders", "Receiving status", "Supplier balances"] },
  "/warehouses": { title: "Warehouses", group: "Operations", description: "Organize stock by shop, branch and warehouse location.", tasks: ["Locations", "Transfers", "Stock by location"] },
  "/expenses": { title: "Expenses", group: "Operations", description: "Record business expenses and keep supporting information together.", tasks: ["Expense register", "Categories", "Payment status"] },
  "/reports": { title: "Reports", group: "Insights", description: "Review business performance using data from the connected workspace.", tasks: ["Sales reports", "Inventory reports", "Expense reports"] },
  "/ai-assistant": { title: "AI assistant", group: "Tools & communication", description: "A future workspace for business questions and assisted workflows.", tasks: ["Business insights", "Workflow assistance", "Suggested actions"] },
  "/team": { title: "Team & permissions", group: "Workspace", description: "Manage staff, roles and the actions each role can access.", tasks: ["Team members", "Role assignments", "Access review"] },
  "/integrations": { title: "Integrations", group: "Workspace", description: "Connect approved services and business tools to this workspace.", tasks: ["Payment providers", "Communication channels", "Connected services"] },
};

export function ModuleShellPage() {
  const location = useLocation();
  const module = MODULES[location.pathname] ?? MODULES["/dashboard"];

  return (
    <DashboardLayout>
      <main className="zb-module-shell-page">
        <div className="zb-module-shell-heading">
          <div>
            <p className="zb-module-shell-eyebrow">{module.group}</p>
            <h1>{module.title}</h1>
            <p>{module.description}</p>
          </div>
          <span className="zb-module-shell-mark"><Construction size={22} aria-hidden="true" /></span>
        </div>
        <section className="zb-module-shell-notice">
          <span className="zb-module-shell-notice-icon"><Construction size={18} aria-hidden="true" /></span>
          <div><strong>Module shell is ready</strong><p>This area is reserved for the module implementation. It uses the existing ZooBusiness navigation, theme and responsive layout.</p></div>
        </section>
        <div className="zb-module-shell-grid">
          {module.tasks.map((task, index) => (
            <article className="zb-module-shell-card" key={task}>
              <span className="zb-module-shell-card-number">0{index + 1}</span>
              <div className="zb-module-shell-skeleton wide" />
              <div className="zb-module-shell-skeleton" />
              <strong>{task}</strong>
              <small>Placeholder — implementation not started</small>
            </article>
          ))}
        </div>
        <Link className="zb-module-shell-back" to="/dashboard">Return to dashboard <ArrowUpRight size={16} /></Link>
      </main>
    </DashboardLayout>
  );
}
