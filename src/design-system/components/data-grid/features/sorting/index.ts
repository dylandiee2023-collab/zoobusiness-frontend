import type { DataGridColumn } from "../../DataGrid.types";

export type SortDirection = "asc" | "desc";

export function sortRows<T = Record<string, unknown>>(
  rows: T[],
  column: DataGridColumn<T>,
  direction: SortDirection,
): T[] {
  return [...rows].sort((a, b) => {
    const left = a[column.field];

    const right = b[column.field];

    if (left === right) {
      return 0;
    }

    if (left == null) {
      return 1;
    }

    if (right == null) {
      return -1;
    }

    const result = String(left).localeCompare(String(right), undefined, {
      numeric: true,
      sensitivity: "base",
    });

    return direction === "asc" ? result : -result;
  });
}
