import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  CircleDollarSign,
  ClipboardList,
  LoaderCircle,
  Package,
  RefreshCw,
  ShoppingCart,
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
  return new Intl.NumberFormat("en-TZ", { maximumFractionDigits: 0 }).format(value);
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
    <span className={`dashboard-change ${positive ? "is-positive" : "is-negative"}`}>
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
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

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
      .catch((caught: unknown) => {
        if (!active) return;
        setError(
          caught instanceof Error
            ? caught.message
            : "We couldn't load your business summary.",
        );
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
    reloadKey,
    workspace?.id,
    workspaceLoading,
  ]);

  const workspaceUnavailable =
    !workspaceLoading &&
    platform.authentication.ready &&
    platform.authentication.authenticated &&
    !workspace?.id;
  const maxTrend = Math.max(1, ...(summary?.sales.trend.map((point) => point.amount) ?? []));
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
        <header className="dashboard-page-header">
          <div>
            <p className="dashboard-eyebrow">BUSINESS OVERVIEW</p>
            <h1>Good business starts with a clear view.</h1>
            <p className="dashboard-subtitle">
              Track sales, orders, stock and expenses for {workspace?.name ?? "your business"}.
            </p>
          </div>
          <button
            className="dashboard-refresh-button"
            type="button"
            onClick={() => {
              setError(null);
              setLoading(true);
              setReloadKey((key) => key + 1);
            }}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "dashboard-spinner" : ""} />
            Refresh
          </button>
        </header>

        {error || workspaceUnavailable ? (
          <div className="dashboard-error" role="alert">
            <AlertTriangle size={20} />
            <div>
              <strong>Dashboard data couldn't be loaded</strong>
              <p>{error ?? "No active business workspace is available."}</p>
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  setReloadKey((key) => key + 1);
                }}
              >
                Try again
              </button>
            </div>
          </div>
        ) : null}

        {summary ? (
          <>
            <section className="dashboard-sales-panel" aria-labelledby="dashboard-sales-title">
              <div className="dashboard-sales-top">
                <div>
                  <p className="dashboard-section-kicker">TODAY</p>
                  <h2 id="dashboard-sales-title">Total sales</h2>
                  <p className="dashboard-sales-total">{formatMoney(summary.sales.today, currency)}</p>
                  <MetricChange value={summary.sales.changePercent} />
                </div>
                <div className="dashboard-period-chip">
                  <BarChart3 size={16} />
                  Last 7 days
                </div>
              </div>
              <div className="dashboard-chart" role="img" aria-label="Sales trend for the last seven days">
                {summary.sales.trend.map((point) => {
                  const day = new Date(`${point.date}T12:00:00`).toLocaleDateString("en-TZ", { weekday: "short" });
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
                      <span className={isToday ? "is-today-label" : ""}>{isToday ? "Today" : day}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="dashboard-metrics-grid" aria-label="Business metrics">
              <MetricCard
                title="Sales"
                value={formatMoney(summary.sales.today, currency)}
                change={summary.sales.changePercent}
                icon={<CircleDollarSign size={23} />}
                tone="green"
              />
              <MetricCard
                title="Orders"
                value={formatNumber(summary.orders.today)}
                change={summary.orders.changePercent}
                icon={<ShoppingCart size={23} />}
                tone="blue"
              />
              <MetricCard
                title="Products tracked"
                value={formatNumber(summary.inventory.products)}
                icon={<Package size={23} />}
                tone="orange"
              />
              <MetricCard
                title="Expenses"
                value={formatMoney(summary.expenses.today, currency)}
                change={summary.expenses.changePercent}
                icon={<ClipboardList size={23} />}
                tone="purple"
              />
            </section>

            <section className="dashboard-detail-grid">
              <article className="dashboard-detail-card">
                <div className="dashboard-detail-heading">
                  <span className="dashboard-detail-icon"><Boxes size={20} /></span>
                  <div>
                    <h2>Inventory health</h2>
                    <p>Current stock snapshot</p>
                  </div>
                </div>
                <div className="dashboard-stock-stats">
                  <div><span>Tracked items</span><strong>{formatNumber(summary.inventory.trackedItems)}</strong></div>
                  <div><span>Available units</span><strong>{formatNumber(summary.inventory.availableUnits)}</strong></div>
                  <div className={summary.inventory.lowStockItems > 0 ? "is-warning" : ""}>
                    <span>Low-stock items</span>
                    <strong>{formatNumber(summary.inventory.lowStockItems)}</strong>
                  </div>
                </div>
              </article>
              <article className="dashboard-detail-card dashboard-expense-card">
                <div className="dashboard-detail-heading">
                  <span className="dashboard-detail-icon"><CircleDollarSign size={20} /></span>
                  <div>
                    <h2>Expense snapshot</h2>
                    <p>Active expenses recorded today</p>
                  </div>
                </div>
                <strong className="dashboard-detail-total">{formatMoney(summary.expenses.today, currency)}</strong>
                <MetricChange value={summary.expenses.changePercent} />
              </article>
            </section>
            <p className="dashboard-data-note">
              Data from AutoBots · Updated {new Date(summary.generatedAt).toLocaleTimeString("en-TZ", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </>
        ) : loading ? (
          <SummaryLoading />
        ) : null}
      </div>
    </DashboardLayout>
  );
}
