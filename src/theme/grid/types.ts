import type { Breakpoint } from "@/theme/media";

export interface GridConfig {
  columns: number;
  gap: number;
}

export type GridMap =
  Record<
    Breakpoint,
    GridConfig
  >;