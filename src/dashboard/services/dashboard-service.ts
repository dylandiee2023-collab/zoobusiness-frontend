import type { ApiClientContract } from "@/platform/contracts";

export interface DashboardTrendPoint {
  readonly date: string;
  readonly amount: number;
}

export interface DashboardMetric {
  readonly today: number;
  readonly yesterday: number;
  readonly changePercent: number | null;
}

export interface DashboardSummary {
  readonly currency: string;
  readonly generatedAt: string;
  readonly period: {
    readonly start: string | null;
    readonly end: string | null;
    readonly comparison: string;
  };
  readonly sales: DashboardMetric & {
    readonly trend: readonly DashboardTrendPoint[];
  };
  readonly orders: DashboardMetric;
  readonly expenses: DashboardMetric;
  readonly inventory: {
    readonly products: number;
    readonly trackedItems: number;
    readonly lowStockItems: number;
    readonly availableUnits: number;
  };
}

export class DashboardService {
  private readonly api: ApiClientContract;

  constructor(api: ApiClientContract) {
    this.api = api;
  }

  /** Fetches summary metrics scoped to the active workspace. */
  getSummary(workspaceId: string, currency = "TZS"): Promise<DashboardSummary> {
    const query = new URLSearchParams({ currency });
    return this.api.get<DashboardSummary>(
      `/api/workspaces/${encodeURIComponent(workspaceId)}/dashboard/summary?${query.toString()}`,
    );
  }
}
