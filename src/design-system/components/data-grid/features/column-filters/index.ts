import type { DataGridColumn } from "../../DataGrid.types";

export function applyColumnFilter<T = Record<string, unknown>>(
  rows: T[],
  column: DataGridColumn<T>,
  value: string,
): T[] {
  const keyword = value.trim().toLowerCase();

  if (!keyword) {
    return rows;
  }

  return rows.filter((row) =>
    String(row[column.field] ?? "")
      .toLowerCase()
      .includes(keyword),
  );
}
