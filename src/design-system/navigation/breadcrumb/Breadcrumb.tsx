import { forwardRef } from "react";

import { useTheme } from "@/theme/hooks";

import { breadcrumbRecipe } from "./Breadcrumb.recipe";

import type { BreadcrumbItem, BreadcrumbProps } from "./Breadcrumb.types";

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    { items, separator = "/", className, style, ...props },
    ref,
  ) {
    const { theme } = useTheme();

    const recipe = breadcrumbRecipe(theme, {
      items,

      ...props,

      ...(separator !== undefined && {
        separator,
      }),
    });

    return (
      <nav
        ref={ref}
        className={className}
        style={{
          ...recipe.style,
          ...style,
        }}
        aria-label="Breadcrumb Navigation"
        {...props}
      >
        {items.map((item: BreadcrumbItem, index) => {
          const last = index === items.length - 1;

          return (
            <span
              key={item.href ?? `${String(item.label)}-${index}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {item.icon}

              {item.href && !item.disabled && !last ? (
                <a
                  href={item.href}
                  style={{
                    color: theme.colors.primary,
                    textDecoration: "none",
                    outline: "none",
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={last ? "page" : undefined}
                  style={{
                    color: last
                      ? theme.colors.text
                      : theme.colors.textSecondary,

                    opacity: item.disabled ? 0.5 : 1,

                    pointerEvents: item.disabled ? "none" : "auto",
                  }}
                >
                  {item.label}
                </span>
              )}

              {!last && (
                <span
                  aria-hidden="true"
                  style={{
                    color: theme.colors.textMuted,
                  }}
                >
                  {separator}
                </span>
              )}
            </span>
          );
        })}
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";
