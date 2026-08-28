import type { JSX } from "react";

import { dataGridRecipe } from "../DataGrid.recipe";

import type { DataGridColumn } from "../DataGrid.types";

interface Props<T extends Record<string, unknown>> {
  row: T;

  column: DataGridColumn<T>;
}

export function Cell<T extends Record<string, unknown>>({
  row,
  column,
}: Props<T>): JSX.Element {
  const styles = dataGridRecipe();

  const value = row[column.field];

  return (
    <td className={styles.cell}>
      {column.render ? column.render(value, row) : String(value ?? "")}
    </td>
  );
}
