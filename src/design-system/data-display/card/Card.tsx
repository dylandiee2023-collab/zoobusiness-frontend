import { forwardRef } from "react";

import { useTheme } from "@/theme/hooks";

import { cardRecipe } from "./Card.recipe";

import type { CardProps } from "./Card.types";

export const Card = forwardRef<
  HTMLDivElement,
  CardProps
>(function Card(
  {
    variant,
    fullWidth,
    className,
    style,
    children,
    ...props
  },
  ref,
) {
  const { theme } = useTheme();

  const recipe = cardRecipe(theme, {
    ...props,

    ...(variant !== undefined && {
      variant,
    }),

    ...(fullWidth !== undefined && {
      fullWidth,
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
      {children}
    </div>
  );
});

Card.displayName = "Card";