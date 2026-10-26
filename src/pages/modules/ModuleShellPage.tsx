import { ArrowUpRight, Construction } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { DashboardLayout } from "@/layouts/dashboard";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";


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
  const { language } = useLanguage();
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) => resolvePublicCopy(language, key);
  const module = MODULES[location.pathname] ?? MODULES["/inventory"]!;
  const titleKeys: Record<string, Parameters<typeof resolvePublicCopy>[1]> = { "/inventory": "pageInventory", "/sales": "pageSales", "/pos": "pagePos", "/customers": "pageCustomers", "/customers/messages": "pageChats", "/orders": "pageOrders", "/purchases": "pagePurchasing", "/warehouses": "pageWarehouses", "/expenses": "pageExpenses", "/reports": "pageReports", "/ai-assistant": "pageAi", "/team": "pageTeam", "/integrations": "pageIntegrations" };
  const groupKeys: Record<string, Parameters<typeof resolvePublicCopy>[1]> = { Main: "groupMain", Operations: "groupOperations", Insights: "groupInsights", Workspace: "groupWorkspace", "Tools & communication": "groupTools" };

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-5 sm:p-7">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--zb-colors-primary)]">{t(groupKeys[module.group] ?? "groupWorkspace")}</p>
            <h1 className="text-2xl font-extrabold tracking-tight text-[var(--zb-colors-text)] sm:text-3xl">{t(titleKeys[location.pathname] ?? "pageWorkspace")}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--zb-colors-textSecondary)]">{module.description}</p>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--zb-colors-surfaceSecondary)] text-[var(--zb-colors-primary)]"><Construction size={22} aria-hidden="true" /></span>
        </div>
        <section className="flex items-start gap-3 rounded-xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--zb-colors-surfaceSecondary)] text-[var(--zb-colors-primary)]"><Construction size={18} aria-hidden="true" /></span>
          <div className="min-w-0"><strong className="font-bold text-[var(--zb-colors-text)]">{t("moduleShellReady")}</strong><p className="mt-1 text-sm leading-relaxed text-[var(--zb-colors-textSecondary)]">{t("moduleShellBody")}</p></div>
        </section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {module.tasks.map((task, index) => (
            <article className="flex min-w-0 flex-col gap-3 rounded-xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-5" key={task}>
              <span className="text-xs font-bold tracking-widest text-[var(--zb-colors-primary)]">0{index + 1}</span>
              <div className="h-3 w-full rounded bg-[var(--zb-colors-surfaceSecondary)]" />
              <div className="h-3 w-2/3 rounded bg-[var(--zb-colors-surfaceSecondary)]" />
              <strong className="font-semibold text-[var(--zb-colors-text)]">{task}</strong>
              <small className="text-xs text-[var(--zb-colors-textSecondary)]">Placeholder — implementation not started</small>
            </article>
          ))}
        </div>
        <Link className="inline-flex w-fit items-center gap-2 rounded-lg border border-[var(--zb-colors-border)] px-4 py-2 text-sm font-semibold text-[var(--zb-colors-primary)] hover:bg-[var(--zb-colors-surfaceSecondary)]" to="/dashboard">{t("returnDashboard")} <ArrowUpRight size={16} /></Link>
      </div>
    </DashboardLayout>
  );
}
