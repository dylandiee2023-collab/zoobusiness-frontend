import type {
  DataGridColumn,
} from "../../DataGrid.types";

export function reorderColumns<
  T = Record<string, unknown>,
>(
  columns: DataGridColumn<T>[],
  source: number,
  destination: number,
): DataGridColumn<T>[] {
  const next = [
    ...columns,
  ];

  const item =
    next[source];

  if (!item) {
    return next;
  }

  next.splice(
    source,
    1,
  );

  next.splice(
    destination,
    0,
    item,
  );

  return next;
}