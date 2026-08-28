import type { DataGridColumn } from "../../DataGrid.types";

export function pinLeft<T = Record<string, unknown>>(
  columns: DataGridColumn<T>[],
  id: string,
): DataGridColumn<T>[] {
  return columns.map((column) =>
    column.id === id
      ? {
          ...column,
          pinned: "left",
        }
      : column,
  );
}

export function pinRight<T = Record<string, unknown>>(
  columns: DataGridColumn<T>[],
  id: string,
): DataGridColumn<T>[] {
  return columns.map((column) =>
    column.id === id
      ? {
          ...column,
          pinned: "right",
        }
      : column,
  );
}

export function unpin<T = Record<string, unknown>>(
  columns: DataGridColumn<T>[],
  id: string,
): DataGridColumn<T>[] {
  return columns.map((column) =>
    column.id === id
      ? {
          ...column,
          pinned: undefined,
        }
      : column,
  );
}
