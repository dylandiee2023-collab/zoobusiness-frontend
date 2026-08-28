import type { JSX } from "react";

import { dataGridRecipe } from "../DataGrid.recipe";

import type { DataGridProps } from "../DataGrid.types";

import { DataGridProvider } from "../core/provider";

import { Header } from "./Header";

import { Body } from "./Body";

export function DataGrid<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  className = "",
  ...props
}: DataGridProps<T>): JSX.Element {
  const styles = dataGridRecipe();

  return (
    <DataGridProvider>
      <div className={[styles.root, className].join(" ")} {...props}>
        <table className={styles.table}>
          <Header columns={columns} />

          <Body columns={columns} data={data} loading={loading} />
        </table>
      </div>
    </DataGridProvider>
  );
}
