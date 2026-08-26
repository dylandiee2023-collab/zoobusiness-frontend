import type {
  DataGridColumn,
} from "../../DataGrid.types";

export function moveColumn<
  T = Record<string, unknown>,
>(
  columns: DataGridColumn<T>[],
  from: number,
  to: number,
): DataGridColumn<T>[] {
  const next = [...columns];

  const item =
    next[from];

  if (!item) {
    return next;
  }

  next.splice(from, 1);

  next.splice(
    to,
    0,
    item,
  );

  return next;
}