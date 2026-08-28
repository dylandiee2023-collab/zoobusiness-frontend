import type { HTMLAttributes, ReactNode } from "react";

export interface TableColumn<T> {
  key: keyof T;

  header: ReactNode;

  render?: (value: T[keyof T], row: T) => ReactNode;
}

export interface TableProps<T> extends HTMLAttributes<HTMLTableElement> {
  data: T[];

  columns: TableColumn<T>[];

  striped?: boolean;

  hoverable?: boolean;
}
