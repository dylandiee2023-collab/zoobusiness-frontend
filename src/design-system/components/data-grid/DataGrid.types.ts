import type { HTMLAttributes, ReactNode } from "react";

export type DataGridAlign = "left" | "center" | "right";

export interface DataGridColumn<T = Record<string, unknown>> {
  id: string;

  field: keyof T & string;

  header: ReactNode;

  width?: number | undefined;

  minWidth?: number | undefined;

  maxWidth?: number | undefined;

  align?: DataGridAlign | undefined;

  sortable?: boolean | undefined;

  filterable?: boolean | undefined;

  resizable?: boolean | undefined;

  hidden?: boolean | undefined;

  render?: (value: T[keyof T], row: T) => ReactNode;
}

export interface DataGridProps<T = Record<string, unknown>> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  columns: DataGridColumn<T>[];

  data: T[];

  loading?: boolean | undefined;

  rowKey?: keyof T | undefined;

  striped?: boolean | undefined;

  bordered?: boolean | undefined;

  hoverable?: boolean | undefined;

  selectable?: boolean | undefined;

  stickyHeader?: boolean | undefined;

  onRowClick?: (row: T) => void;
}
