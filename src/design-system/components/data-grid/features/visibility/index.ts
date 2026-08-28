import type { DataGridColumn } from "../../DataGrid.types";

export function hideColumn<T = Record<string, unknown>>(
  columns: DataGridColumn<T>[],
  id: string,
): DataGridColumn<T>[] {
  return columns.map((column) =>
    column.id === id
      ? {
          ...column,
          hidden: true,
        }
      : column,
  );
}

export function showColumn<T = Record<string, unknown>>(
  columns: DataGridColumn<T>[],
  id: string,
): DataGridColumn<T>[] {
  return columns.map((column) =>
    column.id === id
      ? {
          ...column,
          hidden: false,
        }
      : column,
  );
}

export function toggleColumn<T = Record<string, unknown>>(
  columns: DataGridColumn<T>[],
  id: string,
): DataGridColumn<T>[] {
  return columns.map((column) =>
    column.id === id
      ? {
          ...column,
          hidden: !column.hidden,
        }
      : column,
  );
}
