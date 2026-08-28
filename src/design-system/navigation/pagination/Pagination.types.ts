import type { HTMLAttributes } from "react";

export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  page: number;

  totalPages: number;

  siblingCount?: number;

  onChange?(page: number): void;
}
