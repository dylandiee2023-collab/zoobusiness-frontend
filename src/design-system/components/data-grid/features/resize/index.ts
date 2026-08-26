import type {
  DataGridColumn,
} from "../../DataGrid.types";

export function resizeColumn<
  T = Record<string, unknown>,
>(
  columns: DataGridColumn<T>[],
  id: string,
  width: number,
): DataGridColumn<T>[] {
  return columns.map(
    (column) =>
      column.id === id
        ? {
            ...column,
            width,
          }
        : column,
  );
}