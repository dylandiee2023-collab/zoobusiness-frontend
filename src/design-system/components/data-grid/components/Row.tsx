import type { JSX } from "react";

import { dataGridRecipe } from "../DataGrid.recipe";

import type { DataGridColumn } from "../DataGrid.types";

import { Cell } from "./Cell";

interface Props<T extends Record<string, unknown>> {
  row: T;

  columns: DataGridColumn<T>[];
}

export function Row<T extends Record<string, unknown>>({
  row,
  columns,
}: Props<T>): JSX.Element {
  const styles = dataGridRecipe();

  return (
    <tr className={styles.row}>
      {columns
        .filter((column) => !column.hidden)
        .map((column) => (
          <Cell key={column.id} row={row} column={column} />
        ))}
    </tr>
  );
}
