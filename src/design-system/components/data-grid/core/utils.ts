import type {
  DataGridColumn,
} from "../DataGrid.types";

export function getColumnById<
  T = Record<string, unknown>,
>(
  columns: DataGridColumn<T>[],
  id: string,
): DataGridColumn<T> | undefined {
  return columns.find(
    (column) =>
      column.id === id,
  );
}

export function getVisibleColumns<
  T = Record<string, unknown>,
>(
  columns: DataGridColumn<T>[],
): DataGridColumn<T>[] {
  return columns.filter(
    (column) =>
      !column.hidden,
  );
}

export function clampWidth(
  width: number,
  min = 60,
  max = 600,
): number {
  return Math.min(
    Math.max(width, min),
    max,
  );
}