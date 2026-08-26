import type {
  DataGridColumn,
} from "../../DataGrid.types";

export interface ColumnGroup<
  T = Record<string, unknown>,
> {
  id: string;

  title: string;

  columns:
    DataGridColumn<T>[];
}