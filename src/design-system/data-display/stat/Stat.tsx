import { forwardRef } from "react";

import { useTheme } from "@/theme/hooks";

import { statRecipe } from "./Stat.recipe";

import type { StatProps } from "./Stat.types";

export const Stat = forwardRef<
  HTMLDivElement,
  StatProps
>(function Stat(
  {
    label,
    value,
    helper,
    icon,
    trend,
    className,
    style,
    ...props
  },
  ref,
) {
  const { theme } = useTheme();

  const recipe = statRecipe(theme, {
  label,
  value,

  ...props,

  ...(helper !== undefined && {
    helper,
  }),

  ...(icon !== undefined && {
    icon,
  }),

  ...(trend !== undefined && {
    trend,
  }),
});

  const trendColor =
    trend === "up"
      ? theme.colors.success
      : trend === "down"
        ? theme.colors.danger
        : theme.colors.textSecondary;

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
      {icon && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          {icon}
        </div>
      )}

      <div
        style={{
          fontSize: 14,
          color:
            theme.colors.textSecondary,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: theme.colors.text,
        }}
      >
        {value}
      </div>

      {helper && (
        <div
          style={{
            fontSize: 13,
            color: trendColor,
          }}
        >
          {helper}
        </div>
      )}
    </div>
  );
});

Stat.displayName = "Stat";