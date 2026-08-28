import { createElement, forwardRef } from "react";

import { useTheme } from "@/theme/hooks";

import { boxRecipe } from "./Box.recipe";

import type { BoxProps } from "./Box.types";

export const Box = forwardRef<HTMLDivElement, BoxProps<"div">>(function Box(
  { as, style, children, ...props },
  ref,
) {
  const { theme } = useTheme();

  const recipe = boxRecipe(theme, {});

  return createElement(
    as ?? "div",
    {
      ...props,
      ref,
      style: {
        ...recipe.style,
        ...style,
      },
    },
    children,
  );
});

Box.displayName = "Box";
