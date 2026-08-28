import { forwardRef } from "react";

import { useTheme } from "@/theme/hooks";

import { emptyStateRecipe } from "./EmptyState.recipe";

import type { EmptyStateProps } from "./EmptyState.types";

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    { title, description, icon, action, className, style, ...props },
    ref,
  ) {
    const { theme } = useTheme();

    const recipe = emptyStateRecipe(theme, {
      title,

      ...props,

      ...(description !== undefined && {
        description,
      }),

      ...(icon !== undefined && {
        icon,
      }),

      ...(action !== undefined && {
        action,
      }),
    });

    return (
      <div
        ref={ref}
        className={className}
        style={{
          ...recipe.style,
          ...style,
        }}
        {...props}
      >
        {icon && <div>{icon}</div>}

        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: theme.colors.text,
          }}
        >
          {title}
        </div>

        {description && (
          <div
            style={{
              maxWidth: 420,
              fontSize: 14,
              lineHeight: 1.6,
              color: theme.colors.textSecondary,
            }}
          >
            {description}
          </div>
        )}

        {action && (
          <div
            style={{
              marginTop: 8,
            }}
          >
            {action}
          </div>
        )}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";
