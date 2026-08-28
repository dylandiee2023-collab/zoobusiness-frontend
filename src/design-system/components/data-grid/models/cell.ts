import type { DataGridColumn } from "../DataGrid.types";

import type { RowState } from "./row";

export interface CellState<T = Record<string, unknown>> {
  row: RowState<T>;

  column: DataGridColumn<T>;

  value: unknown;
}
