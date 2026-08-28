import type { JSX } from "react";

import { dataGridRecipe } from "../DataGrid.recipe";

import type { DataGridColumn } from "../DataGrid.types";

interface Props<T extends Record<string, unknown>> {
  columns: DataGridColumn<T>[];
}

export function Header<T extends Record<string, unknown>>({
  columns,
}: Props<T>): JSX.Element {
  const styles = dataGridRecipe();

  return (
    <thead className={styles.header}>
      <tr className={styles.headerRow}>
        {columns
          .filter((column) => !column.hidden)
          .map((column) => (
            <th
              key={column.id}
              className={styles.headerCell}
              style={{
                width: column.width,
              }}
            >
              {column.header}
            </th>
          ))}
      </tr>
    </thead>
  );
}
