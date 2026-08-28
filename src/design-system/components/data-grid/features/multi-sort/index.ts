import type { DataGridColumn } from "../../DataGrid.types";

export interface SortRule<T = Record<string, unknown>> {
  column: DataGridColumn<T>;

  direction: "asc" | "desc";
}

export function multiSort<T = Record<string, unknown>>(
  rows: T[],
  rules: SortRule<T>[],
): T[] {
  if (rules.length === 0) {
    return rows;
  }

  return [...rows].sort((left, right) => {
    for (const rule of rules) {
      const a = left[rule.column.field];

      const b = right[rule.column.field];

      if (a === b) {
        continue;
      }

      const result = String(a).localeCompare(String(b), undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return rule.direction === "asc" ? result : -result;
    }

    return 0;
  });
}
