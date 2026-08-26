import type {
  JSX,
} from "react";

import {
  paginationRecipe,
} from "./Pagination.recipe";

import type {
  PaginationProps,
} from "./Pagination.types";

export function Pagination({
  page,
  totalPages,
  onPageChange,
  className = "",
  ...props
}: PaginationProps): JSX.Element {
  const styles =
    paginationRecipe();

  return (
    <div
      className={`${styles.root} ${className}`}
      {...props}
    >
      {Array.from(
        {
          length: totalPages,
        },
        (_, index) => {
          const current =
            index + 1;

          return (
            <button
              key={current}
              type="button"
              disabled={
                current ===
                page
              }
              className={[
                styles.button,
                current ===
                page
                  ? styles.active
                  : "",
                current ===
                page
                  ? styles.disabled
                  : "",
              ].join(" ")}
              onClick={() =>
                onPageChange?.(
                  current,
                )
              }
            >
              {current}
            </button>
          );
        },
      )}
    </div>
  );
}