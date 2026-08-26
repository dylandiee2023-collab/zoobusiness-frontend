import type {
  HTMLAttributes,
} from "react";

export interface PaginationProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange"
  > {
  page: number;

  totalPages: number;

  onPageChange?: (
    page: number,
  ) => void;
}