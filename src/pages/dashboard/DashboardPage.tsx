import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Bot,
  CircleDollarSign,
  ClipboardList,
  LoaderCircle,
  Package,
  RefreshCw,
  ShoppingCart,
  Users,
} from "lucide-react";

import { DashboardLayout } from "@/layouts/dashboard";
import { useLanguage } from "@/app/language";
import { resolvePublicCopy } from "@/app/language/public-copy";
import { usePlatform } from "@/platform/providers/use-platform";
import { useWorkspace } from "@/workspace/providers/workspace-provider";
import {
  DashboardService,
  type DashboardSummary,
} from "@/dashboard/services/dashboard-service";


function formatMoney(value: number, currency: string): string {
  return new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-TZ", { maximumFractionDigits: 0 }).format(
    value,
  );
}

function formatChange(value: number | null): string {
  if (value === null) return "New";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}%`;
}

function MetricChange({ value }: { value: number | null }) {
  const positive = value !== null && value >= 0;
  const Icon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold ${positive ? "text-emerald-600" : "text-rose-600"}`}
    >
      <Icon size={16} aria-hidden="true" />
      {formatChange(value)}
      <span className="text-xs text-[var(--zb-colors-textSecondary)]">vs yesterday</span>
    </span>
  );
}

function MetricCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change?: number | null;
  icon: ReactNode;
  tone: "green" | "blue" | "orange" | "purple";
}) {
  return (
    <article className="flex min-w-0 flex-col gap-2 rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-4">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--zb-colors-surfaceSecondary)] text-[var(--zb-colors-primary)]">{icon}</div>
      <p className="text-xs font-medium text-[var(--zb-colors-textSecondary)]">{title}</p>
      <p className="text-2xl font-bold tracking-tight text-[var(--zb-colors-text)]">{value}</p>
      {change !== undefined ? <MetricChange value={change} /> : null}
    </article>
  );
}

function SummaryLoading() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center text-sm text-[var(--zb-colors-textSecondary)]" role="status">
      <LoaderCircle className="animate-spin text-[var(--zb-colors-primary)]" size={24} />
      <span>Loading your business summary…</span>
    </div>
  );
}

export function DashboardPage() {
  const { language } = useLanguage();
  const t = (key: Parameters<typeof resolvePublicCopy>[1]) => resolvePublicCopy(language, key);
  const platform = usePlatform();
  const { workspace, loading: workspaceLoading } = useWorkspace();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const dashboardService = useMemo(
    () => new DashboardService(platform.api),
    [platform.api],
  );

  useEffect(() => {
    if (!platform.authentication.ready) return;

    if (!platform.authentication.authenticated) {
      navigate("/login", { replace: true });
      return;
    }

    if (workspaceLoading || !workspace?.id) return;

    let active = true;
    dashboardService
      .getSummary(workspace.id)
      .then((data) => {
        if (active) setSummary(data);
      })
      .catch(() => {
        if (active) setSummary(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [
    dashboardService,
    navigate,
    platform.authentication.authenticated,
    platform.authentication.ready,
    workspace?.id,
    workspaceLoading,
  ]);

  const workspaceUnavailable =
    !workspaceLoading &&
    platform.authentication.ready &&
    platform.authentication.authenticated &&
    !workspace?.id;
  const maxTrend = Math.max(
    1,
    ...(summary?.sales.trend.map((point) => point.amount) ?? []),
  );
  const currency = summary?.currency ?? "TZS";
  const stockAvailability = summary && summary.inventory.trackedItems > 0
    ? Math.max(0, Math.min(100, Math.round(((summary.inventory.trackedItems - summary.inventory.lowStockItems) / summary.inventory.trackedItems) * 100)))
    : null;

  if (
    workspaceLoading ||
    !platform.authentication.ready ||
    (loading && !summary && !workspaceUnavailable)
  ) {
    return (
      <DashboardLayout>
        <div className="mx-auto flex w-full max-w-[1600px] min-w-0 flex-col gap-6 p-4 text-[var(--zb-colors-text)] sm:p-6">
          <SummaryLoading />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-[1600px] min-w-0 flex-col gap-6 p-4 text-[var(--zb-colors-text)] sm:p-6">
{summary ? (
          <>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <section
              className="min-w-0 rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-5"
              aria-labelledby="dashboard-sales-title"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--zb-colors-primary)]">{t("today")}</p>
                  <h2 id="dashboard-sales-title">{t("totalSales")}</h2>
                  <p className="my-2 text-3xl font-extrabold tracking-tight">
                    {formatMoney(summary.sales.today, currency)}
                  </p>
                  <MetricChange value={summary.sales.changePercent} />
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--zb-colors-surfaceSecondary)] px-3 py-2 text-xs font-semibold text-[var(--zb-colors-textSecondary)]">
                  <BarChart3 size={16} />
                  Last 7 days
                </div>
              </div>
              <div
                className="mt-5 grid h-44 grid-cols-7 items-end gap-2 sm:gap-4"
                role="img"
                aria-label={t("salesTrendAria")}
              >
                {summary.sales.trend.map((point) => {
                  const day = new Date(
                    `${point.date}T12:00:00`,
                  ).toLocaleDateString("en-TZ", { weekday: "short" });
                  const isToday = point.date === summary.period.end;
                  const height = Math.max(5, (point.amount / maxTrend) * 100);

                  return (
                    <div className="flex h-full min-w-0 flex-col items-center justify-end gap-2" key={point.date}>
                      <div className="flex h-full w-full items-end justify-center">
                        <div
                          className={`w-full max-w-8 rounded-t-md bg-[var(--zb-colors-primary)] ${isToday ? "opacity-100" : "opacity-50"}`}
                          style={{ height: `${height}%` }}
                          title={`${point.date}: ${formatMoney(point.amount, currency)}`}
                        />
                      </div>
                      <span className={`text-[10px] ${isToday ? "font-bold text-[var(--zb-colors-primary)]" : "text-[var(--zb-colors-textSecondary)]"}`}>
                        {isToday ? "Today" : day}
                      </span>
                    </div>
                  );
                })}
</div>
            </section>
            <section className="grid min-w-0 grid-cols-1 gap-4 rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-5 sm:grid-cols-2" aria-labelledby="dashboard-health-title">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--zb-colors-primary)]">{t("businessHealth")}</p>
                <h2 id="dashboard-health-title">{t("stockAvailability")}</h2>
                <p>Share of tracked items not currently flagged as low stock.</p>
              </div>
              <div className="flex min-w-0 flex-col items-center justify-center gap-4">
                <div className="grid h-32 w-32 place-items-center rounded-full border-[12px] border-[var(--zb-colors-primary)] bg-[var(--zb-colors-surface)] text-center" style={{ "--health-score": `${stockAvailability ?? 0}%` } as CSSProperties}>
                  <div><strong>{stockAvailability === null ? "—" : `${stockAvailability}%`}</strong><span>not low-stock</span></div>
                </div>
                <div className="flex flex-wrap justify-center gap-3 text-xs text-[var(--zb-colors-textSecondary)]"><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-[var(--zb-colors-primary)]" />{t("notLowStock")}</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-500" />{t("lowStock")}</span></div>
              </div>
            </section>
            </div>

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Business metrics">
              <MetricCard title="Total sales" value={summary ? formatMoney(summary.sales.today, currency) : "—"} change={summary?.sales.changePercent} icon={<CircleDollarSign size={23} />} tone="green" />
              <MetricCard title="Orders today" value={summary ? formatNumber(summary.orders.today) : "—"} icon={<ShoppingCart size={23} />} tone="blue" />
              <MetricCard title="Total products" value={summary ? formatNumber(summary.inventory.products) : "—"} icon={<Package size={23} />} tone="orange" />
              <MetricCard title="Customers" value={summary ? formatNumber(summary.customers.total) : "—"} icon={<Users size={23} />} tone="purple" />
              <MetricCard title="Out of stock" value={summary ? formatNumber(summary.inventory.outOfStockItems) : "—"} icon={<Boxes size={23} />} tone="orange" />
              <MetricCard title="Expenses" value={summary ? formatMoney(summary.expenses.today, currency) : "—"} change={summary?.expenses.changePercent} icon={<ClipboardList size={23} />} tone="purple" />
            </section>

            <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <article className="min-w-0 rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--zb-colors-surfaceSecondary)] text-[var(--zb-colors-primary)]">
                    <Boxes size={20} />
                  </span>
                  <div>
                    <h2>{t("inventoryHealth")}</h2>
                    <p>{t("currentStockSnapshot")}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span>{t("trackedItems")}</span>
                    <strong>
                      {formatNumber(summary.inventory.trackedItems)}
                    </strong>
                  </div>
                  <div>
                    <span>{t("availableUnits")}</span>
                    <strong>
                      {formatNumber(summary.inventory.availableUnits)}
                    </strong>
                  </div>
                  <div
                    className={
                      summary.inventory.lowStockItems > 0 ? "is-warning" : ""
                    }
                  >
                    <span>{t("lowStock")}</span>
                    <strong>
                      {formatNumber(summary.inventory.lowStockItems)}
                    </strong>
                  </div>
                </div>
              </article>
              <article className="min-w-0 rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--zb-colors-surfaceSecondary)] text-[var(--zb-colors-primary)]">
                    <CircleDollarSign size={20} />
                  </span>
                  <div>
                    <h2>{t("expenseSnapshot")}</h2>
                    <p>{t("activeExpensesToday")}</p>
                  </div>
                </div>
                <strong className="text-2xl font-bold">
                  {formatMoney(summary.expenses.today, currency)}
                </strong>
                <MetricChange value={summary.expenses.changePercent} />
              </article>
            </section>
            <p className="mt-4 rounded-lg bg-[var(--zb-colors-surfaceSecondary)] p-3 text-xs leading-relaxed text-[var(--zb-colors-textSecondary)]">
              Data from AutoBots · Updated{" "}
              {new Date(summary.generatedAt).toLocaleTimeString("en-TZ", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </>
        ) : loading ? (
          <SummaryLoading />
        ) : (
          <section className="mx-auto flex w-full max-w-[1600px] min-w-0 flex-col gap-5 p-4 sm:p-6" aria-label="Dashboard summary layout">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <section className="min-w-0 min-h-48 rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--zb-colors-primary)]">{t("today")}</p>
                  <h2>{t("totalSales")}</h2>
                  <p className="my-2 text-3xl font-extrabold tracking-tight">—</p>
                  <p className="mt-3 text-sm text-[var(--zb-colors-textSecondary)]">{t("summaryUnavailable")}</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--zb-colors-surfaceSecondary)] px-3 py-2 text-xs font-semibold text-[var(--zb-colors-textSecondary)]"><BarChart3 size={16} />{t("last7Days")}</div>
              </div>
              <p className="mt-3 text-sm text-[var(--zb-colors-textSecondary)]">{t("salesTrendUnavailable")}</p>
            </section>
            <section className="grid min-w-0 grid-cols-1 gap-4 rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-5 sm:grid-cols-2" aria-labelledby="dashboard-health-title">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--zb-colors-primary)]">{t("businessHealth")}</p>
                <h2 id="dashboard-health-title">{t("stockAvailability")}</h2>
                <p>{t("healthUnavailable")}</p>
              </div>
              <div className="flex min-w-0 flex-col items-center justify-center gap-4">
                <div className="grid h-32 w-32 place-items-center rounded-full border-[12px] border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] text-center"><div><strong>—</strong><span>awaiting data</span></div></div>
                <div className="flex flex-wrap justify-center gap-3 text-xs text-[var(--zb-colors-textSecondary)]"><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-[var(--zb-colors-primary)]" />{t("notLowStock")}</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-500" />{t("lowStock")}</span></div>
              </div>
            </section>
            </div>
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-label="Business metrics">
              <MetricCard title="Total sales" value="—" icon={<CircleDollarSign size={23} />} tone="green" />
              <MetricCard title="Available sales" value="—" icon={<ShoppingCart size={23} />} tone="blue" />
              <MetricCard title="Total products" value="—" icon={<Package size={23} />} tone="orange" />
              <MetricCard title="Customers" value="—" icon={<Users size={23} />} tone="purple" />
              <MetricCard title="Out of stock" value="—" icon={<Boxes size={23} />} tone="orange" />
              <MetricCard title="Expenses" value="—" icon={<ClipboardList size={23} />} tone="purple" />
            </section>
            
          </section>
        )}
<section className="rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-5">
          <div className="mb-4 flex items-center justify-between gap-3"><h2>{t("quickActions")}</h2><span>{t("seeAll")}</span></div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <button type="button" onClick={() => navigate("/products")}><Package size={26} /><strong>{t("addProduct")}</strong><span>{t("manageCatalogue")}</span></button>
            <button type="button" onClick={() => navigate("/ai-assistant")}><Bot size={26} /><strong>{t("aiAssistant")}</strong><span>{t("businessInsights")}</span></button>
            <button type="button" onClick={() => navigate("/pos")}><ShoppingCart size={26} /><strong>{t("newSale")}</strong><span>{t("openPointOfSale")}</span></button>
            <button type="button" onClick={() => navigate("/customers")}><Users size={26} /><strong>{t("customers")}</strong><span>{t("manageCustomerRecords")}</span></button>
            <button type="button" onClick={() => navigate("/orders")}><ClipboardList size={26} /><strong>{t("pageOrders")}</strong><span>{t("reviewFulfilOrders")}</span></button>
            <button type="button" onClick={() => navigate("/reports")}><BarChart3 size={26} /><strong>{t("pageReports")}</strong><span>{t("reviewBusinessActivity")}</span></button>
          </div>
        </section>
        <section className="min-h-36 min-w-0 rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-5">
          <div className="mb-4 flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--zb-colors-surfaceSecondary)] text-[var(--zb-colors-primary)]"><RefreshCw size={20} /></span><div><h2>{t("recentActivity")}</h2><p>{t("latestBusinessEvents")}</p></div></div>
          <p className="mt-3 text-sm leading-relaxed text-[var(--zb-colors-textSecondary)]">{t("activityFeedUnavailable")}</p>
        </section>
        <section className="min-h-36 min-w-0 rounded-2xl border border-[var(--zb-colors-border)] bg-[var(--zb-colors-surface)] p-5">
          <div className="mb-4 flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--zb-colors-surfaceSecondary)] text-[var(--zb-colors-primary)]"><BarChart3 size={20} /></span><div><h2>{t("businessAnalytics")}</h2><p>{t("salesCustomerInventoryInsights")}</p></div></div>
          <p className="mt-3 text-sm leading-relaxed text-[var(--zb-colors-textSecondary)]">{t("additionalAnalytics")}</p>
        </section>
      </div>
    </DashboardLayout>
  );
}
