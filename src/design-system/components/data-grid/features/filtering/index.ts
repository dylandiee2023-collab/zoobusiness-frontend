import type {
  DataGridColumn,
} from "../../DataGrid.types";

export function filterRows<
  T = Record<string, unknown>,
>(
  rows: T[],
  column: DataGridColumn<T>,
  query: string,
): T[] {
  const keyword =
    query
      .trim()
      .toLowerCase();

  if (!keyword) {
    return rows;
  }

  return rows.filter(
    (row) =>
      String(
        row[column.field] ??
          "",
      )
        .toLowerCase()
        .includes(keyword),
  );
}