import { forwardRef } from "react";

import { Box } from "../box";
import { useTheme } from "@/theme/hooks";

import { stackRecipe } from "./Stack.recipe";

import type { StackProps } from "./Stack.types";

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { style, children, ...props },
  ref,
) {
  const { theme } = useTheme();

  const recipe = stackRecipe(theme, props);

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

Stack.displayName = "Stack";
