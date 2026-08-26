import type {
  JSX,
} from "react";

import {
  dataGridRecipe,
} from "../DataGrid.recipe";

import type {
  DataGridColumn,
} from "../DataGrid.types";

import {
  Row,
} from "./Row";

interface Props<
  T extends Record<
    string,
    unknown
  >,
> {
  columns:
    DataGridColumn<T>[];

  data: T[];

  loading: boolean;
}

export function Body<
  T extends Record<
    string,
    unknown
  >,
>({
  columns,
  data,
  loading,
}: Props<T>): JSX.Element {
  const styles =
    dataGridRecipe();

  if (loading) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={
              columns.length
            }
            className={
              styles.loading
            }
          >
            Loading...
          </td>
        </tr>
      </tbody>
    );
  }

  if (
    data.length === 0
  ) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={
              columns.length
            }
            className={
              styles.empty
            }
          >
            No data
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody
      className={
        styles.body
      }
    >
      {data.map(
        (
          row,
          index,
        ) => (
          <Row
            key={index}
            row={row}
            columns={
              columns
            }
          />
        ),
      )}
    </tbody>
  );
}