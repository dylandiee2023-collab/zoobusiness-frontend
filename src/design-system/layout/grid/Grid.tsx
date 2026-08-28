import { forwardRef } from "react";

import { Box } from "../box";

import { useTheme } from "@/theme/hooks";

import { gridRecipe } from "./Grid.recipe";

import type { GridProps } from "./Grid.types";

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { style, children, ...props },
  ref,
) {
  const { theme } = useTheme();

  const recipe = gridRecipe(theme, props);

  return (
    <Box
      ref={ref}
      {...props}
      style={{
        ...recipe.style,
        ...style,
      }}
    >
      {children}
    </Box>
  );
});

Grid.displayName = "Grid";
