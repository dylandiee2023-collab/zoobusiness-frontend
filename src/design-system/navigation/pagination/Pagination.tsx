import { forwardRef } from "react";

import { useTheme } from "@/theme/hooks";

import { paginationRecipe } from "./Pagination.recipe";

import type { PaginationProps } from "./Pagination.types";

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  function Pagination(
    {
      page,
      totalPages,
      siblingCount = 1,
      onChange,
      className,
      style,
      ...props
    },
    ref,
  ) {
    const { theme } = useTheme();

    const recipe = paginationRecipe(theme, {
      page,
      totalPages,

      ...props,

      ...(siblingCount !== undefined && {
        siblingCount,
      }),

      ...(onChange !== undefined && {
        onChange,
      }),
    });

    const pages = Array.from(
      {
        length: totalPages,
      },
      (_, index) => index + 1,
    );

    return (
      <nav
        ref={ref}
        className={className}
        style={{
          ...recipe.style,
          ...style,
        }}
        aria-label="Pagination Navigation"
        {...props}
      >
        <button
          type="button"
          aria-label="Go to previous page"
          disabled={page === 1}
          onClick={() => onChange?.(page - 1)}
          style={{
            cursor: page === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>

        {pages.map((currentPage) => {
          const active = currentPage === page;

          return (
            <button
              key={currentPage}
              type="button"
              aria-label={`Go to page ${currentPage}`}
              aria-current={active ? "page" : undefined}
              onClick={() => onChange?.(currentPage)}
              style={{
                minWidth: 36,

                height: 36,

                borderRadius: 8,

                border: `1px solid ${theme.colors.border}`,

                background: active ? theme.colors.primary : "transparent",

                color: active ? theme.colors.onPrimary : theme.colors.text,

                cursor: active ? "default" : "pointer",

                transition: "all .2s ease",
              }}
            >
              {currentPage}
            </button>
          );
        })}

        <button
          type="button"
          aria-label="Go to next page"
          disabled={page === totalPages}
          onClick={() => onChange?.(page + 1)}
          style={{
            cursor: page === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
