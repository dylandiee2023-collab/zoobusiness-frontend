import type { DataGridColumn } from "../DataGrid.types";

export interface ColumnState<T = Record<string, unknown>> {
  column: DataGridColumn<T>;

  width: number;

  hidden: boolean;

  pinned?: "left" | "right" | undefined;

  order: number;
}
