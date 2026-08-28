import { forwardRef } from "react";

import { Box } from "../box";
import { useTheme } from "@/theme/hooks";

import { centerRecipe } from "./Center.recipe";

import type { CenterProps } from "./Center.types";

export const Center = forwardRef<HTMLDivElement, CenterProps>(function Center(
  { style, children, ...props },
  ref,
) {
  const { theme } = useTheme();

  const recipe = centerRecipe(theme, props);

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

Center.displayName = "Center";
