import { forwardRef } from "react";

import { badgeRecipe } from "./Badge.recipe";
import { useTheme } from "@/theme/hooks";

import type { BadgeProps } from "./Badge.types";

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant, size, rounded, className, style, children, ...props },
  ref,
) {
  const { theme } = useTheme();

  const recipe = badgeRecipe(theme, {
    ...props,

    ...(variant !== undefined && {
      variant,
    }),

    ...(size !== undefined && {
      size,
    }),

    ...(rounded !== undefined && {
      rounded,
    }),
  });

  return (
    <span
      ref={ref}
      className={className}
      style={{
        ...recipe.style,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";
