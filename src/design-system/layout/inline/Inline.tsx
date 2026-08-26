import { forwardRef } from "react";

import { Box } from "../box";
import { useTheme } from "@/theme/hooks";

import { inlineRecipe } from "./Inline.recipe";

import type { InlineProps } from "./Inline.types";

export const Inline = forwardRef<
  HTMLDivElement,
  InlineProps
>(function Inline(
  {
    style,
    children,
    ...props
  },
  ref,
) {
  const { theme } = useTheme();

  const recipe = inlineRecipe(
    theme,
    props,
  );

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

Inline.displayName = "Inline";