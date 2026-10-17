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
import { usePlatform } from "@/platform/providers/use-platform";
import { useWorkspace } from "@/workspace/providers/workspace-provider";
import {
  DashboardService,
  type DashboardSummary,
} from "@/dashboard/services/dashboard-service";

import "./DashboardPage.css";

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
      className={`dashboard-change ${positive ? "is-positive" : "is-negative"}`}
    >
      <Icon size={16} aria-hidden="true" />
      {formatChange(value)}
      <span className="dashboard-change-caption">vs yesterday</span>
    </span>
  );
}

function MetricCard({
  title,
  value,
  change,
  icon,
  tone,
}: {
  title: string;
  value: string;
  change?: number | null;
  icon: ReactNode;
  tone: "green" | "blue" | "orange" | "purple";
}) {
  return (
    <article className="dashboard-metric-card">
      <div className={`dashboard-metric-icon tone-${tone}`}>{icon}</div>
      <p className="dashboard-metric-title">{title}</p>
      <p className="dashboard-metric-value">{value}</p>
      {change !== undefined ? <MetricChange value={change} /> : null}
    </article>
  );
}

function SummaryLoading() {
  return (
    <div className="dashboard-state" role="status">
      <LoaderCircle className="dashboard-spinner" size={24} />
      <span>Loading your business summary…</span>
    </div>
  );
}

export function DashboardPage() {
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

  if (
    workspaceLoading ||
    !platform.authentication.ready ||
    (loading && !summary && !workspaceUnavailable)
  ) {
    return (
      <DashboardLayout>
        <div className="dashboard-page">
          <SummaryLoading />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="dashboard-page">
{summary ? (
          <>
            <div className="dashboard-insights-grid">
            <section
              className="dashboard-sales-panel"
              aria-labelledby="dashboard-sales-title"
            >
              <div className="dashboard-sales-top">
                <div>
                  <p className="dashboard-section-kicker">TODAY</p>
                  <h2 id="dashboard-sales-title">Total sales</h2>
                  <p className="dashboard-sales-total">
                    {formatMoney(summary.sales.today, currency)}
                  </p>
                  <MetricChange value={summary.sales.changePercent} />
                </div>
                <div className="dashboard-period-chip">
                  <BarChart3 size={16} />
                  Last 7 days
                </div>
              </div>
              <div
                className="dashboard-chart"
                role="img"
                aria-label="Sales trend for the last seven days"
              >
                {summary.sales.trend.map((point) => {
                  const day = new Date(
                    `${point.date}T12:00:00`,
                  ).toLocaleDateString("en-TZ", { weekday: "short" });
                  const isToday = point.date === summary.period.end;
                  const height = Math.max(5, (point.amount / maxTrend) * 100);

                  return (
                    <div className="dashboard-chart-column" key={point.date}>
                      <div className="dashboard-chart-bar-wrap">
                        <div
                          className={`dashboard-chart-bar ${isToday ? "is-today" : ""}`}
                          style={{ height: `${height}%` }}
                          title={`${point.date}: ${formatMoney(point.amount, currency)}`}
                        />
                      </div>
                      <span className={isToday ? "is-today-label" : ""}>
                        {isToday ? "Today" : day}
                      </span>
                    </div>
                  );
                })}
</div>
            </section>
            <section className="dashboard-health-card" aria-labelledby="dashboard-health-title">
              <div className="dashboard-health-copy">
                <p className="dashboard-section-kicker">BUSINESS HEALTH</p>
                <h2 id="dashboard-health-title">Stock availability</h2>
                <p>Share of tracked items not currently flagged as low stock.</p>
              </div>
              <div className="dashboard-health-visual">
                <div className="dashboard-health-ring" style={{ "--health-score": `${Math.max(0, Math.min(100, Math.round(((summary.inventory.trackedItems - summary.inventory.lowStockItems) / Math.max(1, summary.inventory.trackedItems)) * 100)))}%` } as CSSProperties}>
                  <div><strong>{summary.inventory.trackedItems > 0 ? `${Math.max(0, Math.min(100, Math.round(((summary.inventory.trackedItems - summary.inventory.lowStockItems) / Math.max(1, summary.inventory.trackedItems)) * 100)))}%` : "—"}</strong><span>in stock</span></div>
                </div>
                <div className="dashboard-health-legend"><span><i className="health-good" />Healthy stock</span><span><i className="health-watch" />Low stock</span><span><i className="health-risk" />Needs review</span></div>
              </div>
            </section>
            </div>

            <section className="dashboard-metrics-grid" aria-label="Business metrics">
              <MetricCard title="Total sales" value={summary ? formatMoney(summary.sales.today, currency) : "—"} change={summary?.sales.changePercent} icon={<CircleDollarSign size={23} />} tone="green" />
              <MetricCard title="Available sales" value="—" icon={<ShoppingCart size={23} />} tone="blue" />
              <MetricCard title="Total products" value={summary ? formatNumber(summary.inventory.products) : "—"} icon={<Package size={23} />} tone="orange" />
              <MetricCard title="Customers" value="—" icon={<Users size={23} />} tone="purple" />
              <MetricCard title="Out of stock" value="—" icon={<Boxes size={23} />} tone="orange" />
              <MetricCard title="Expenses" value={summary ? formatMoney(summary.expenses.today, currency) : "—"} change={summary?.expenses.changePercent} icon={<ClipboardList size={23} />} tone="purple" />
            </section>

            <section className="dashboard-detail-grid">
              <article className="dashboard-detail-card">
                <div className="dashboard-detail-heading">
                  <span className="dashboard-detail-icon">
                    <Boxes size={20} />
                  </span>
                  <div>
                    <h2>Inventory health</h2>
                    <p>Current stock snapshot</p>
                  </div>
                </div>
                <div className="dashboard-stock-stats">
                  <div>
                    <span>Tracked items</span>
                    <strong>
                      {formatNumber(summary.inventory.trackedItems)}
                    </strong>
                  </div>
                  <div>
                    <span>Available units</span>
                    <strong>
                      {formatNumber(summary.inventory.availableUnits)}
                    </strong>
                  </div>
                  <div
                    className={
                      summary.inventory.lowStockItems > 0 ? "is-warning" : ""
                    }
                  >
                    <span>Low-stock items</span>
                    <strong>
                      {formatNumber(summary.inventory.lowStockItems)}
                    </strong>
                  </div>
                </div>
              </article>
              <article className="dashboard-detail-card dashboard-expense-card">
                <div className="dashboard-detail-heading">
                  <span className="dashboard-detail-icon">
                    <CircleDollarSign size={20} />
                  </span>
                  <div>
                    <h2>Expense snapshot</h2>
                    <p>Active expenses recorded today</p>
                  </div>
                </div>
                <strong className="dashboard-detail-total">
                  {formatMoney(summary.expenses.today, currency)}
                </strong>
                <MetricChange value={summary.expenses.changePercent} />
              </article>
            </section>
            <p className="dashboard-data-note">
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
          <section className="dashboard-summary-shell" aria-label="Dashboard summary layout">
            <div className="dashboard-insights-grid">
            <section className="dashboard-sales-panel dashboard-shell-sales">
              <div className="dashboard-sales-top">
                <div>
                  <p className="dashboard-section-kicker">TODAY</p>
                  <h2>Total sales</h2>
                  <p className="dashboard-sales-total">—</p>
                  <p className="dashboard-shell-note">Business figures will appear here when the summary API is connected.</p>
                </div>
                <div className="dashboard-period-chip"><BarChart3 size={16} />Last 7 days</div>
              </div>
              <p className="dashboard-shell-note">Sales trend is unavailable until AutoBots returns summary data.</p>
            </section>
            <section className="dashboard-health-card" aria-labelledby="dashboard-health-title">
              <div className="dashboard-health-copy">
                <p className="dashboard-section-kicker">BUSINESS HEALTH</p>
                <h2 id="dashboard-health-title">Stock availability</h2>
                <p>Health indicators will populate when summary data is available.</p>
              </div>
              <div className="dashboard-health-visual">
                <div className="dashboard-health-ring dashboard-health-ring-empty"><div><strong>—</strong><span>awaiting data</span></div></div>
                <div className="dashboard-health-legend"><span><i className="health-good" />Healthy stock</span><span><i className="health-watch" />Low stock</span><span><i className="health-risk" />Needs review</span></div>
              </div>
            </section>
            </div>
            <section className="dashboard-metrics-grid" aria-label="Business metrics">
              <MetricCard title="Total sales" value="—" icon={<CircleDollarSign size={23} />} tone="green" />
              <MetricCard title="Available sales" value="—" icon={<ShoppingCart size={23} />} tone="blue" />
              <MetricCard title="Total products" value="—" icon={<Package size={23} />} tone="orange" />
              <MetricCard title="Customers" value="—" icon={<Users size={23} />} tone="purple" />
              <MetricCard title="Out of stock" value="—" icon={<Boxes size={23} />} tone="orange" />
              <MetricCard title="Expenses" value="—" icon={<ClipboardList size={23} />} tone="purple" />
            </section>
            
          </section>
        )}
<section className="dashboard-quick-actions">
          <div className="dashboard-quick-actions-heading"><h2>Quick actions</h2><span>See all</span></div>
          <div className="dashboard-quick-actions-grid">
            <button type="button" onClick={() => navigate("/products")}><Package size={26} /><strong>Add product</strong><span>Manage your catalogue</span></button>
            <button type="button" onClick={() => navigate("/ai-assistant")}><Bot size={26} /><strong>AI assistant</strong><span>Get business insights</span></button>
            <button type="button" onClick={() => navigate("/pos")}><ShoppingCart size={26} /><strong>New sale</strong><span>Open point of sale</span></button>
            <button type="button" onClick={() => navigate("/customers")}><Users size={26} /><strong>Customers</strong><span>Manage customer records</span></button>
            <button type="button" onClick={() => navigate("/orders")}><ClipboardList size={26} /><strong>Orders</strong><span>Review and fulfil orders</span></button>
            <button type="button" onClick={() => navigate("/reports")}><BarChart3 size={26} /><strong>Reports</strong><span>Review business activity</span></button>
          </div>
        </section>
        <section className="dashboard-detail-card dashboard-recent-activity">
          <div className="dashboard-detail-heading"><span className="dashboard-detail-icon"><RefreshCw size={20} /></span><div><h2>Recent activity</h2><p>Latest business events will appear here</p></div></div>
          <p className="dashboard-placeholder-copy">Activity feed will be connected when the AutoBots activity endpoint is available.</p>
        </section>
        <section className="dashboard-detail-card dashboard-analytics-placeholder">
          <div className="dashboard-detail-heading"><span className="dashboard-detail-icon"><BarChart3 size={20} /></span><div><h2>Business analytics</h2><p>Sales, customer and inventory insights</p></div></div>
          <p className="dashboard-placeholder-copy">Additional analytics will appear here when their data services are connected.</p>
        </section>
      </div>
    </DashboardLayout>
  );
}
