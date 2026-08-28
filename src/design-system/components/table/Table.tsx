import type { JSX } from "react";

import type { TableProps } from "./Table.types";

import { tableRecipe } from "./Table.recipe";

export function Table<T>({
  data,
  columns,
  striped = true,
  hoverable = true,
  className = "",
  ...props
}: TableProps<T>): JSX.Element {
  const styles = tableRecipe(striped, hoverable);

  return (
    <table className={`${styles.table} ${className}`} {...props}>
      <thead className={styles.head}>
        <tr>
          {columns.map((column) => (
            <th key={String(column.key)} className={styles.cell}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index} className={styles.row}>
            {columns.map((column) => (
              <td key={String(column.key)} className={styles.cell}>
                {column.render
                  ? column.render(row[column.key], row)
                  : String(row[column.key] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
