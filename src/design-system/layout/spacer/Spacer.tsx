import { forwardRef } from "react";

import { Box } from "../box";

import { useTheme } from "@/theme/hooks";

import { spacerRecipe } from "./Spacer.recipe";

import type { SpacerProps } from "./Spacer.types";

export const Spacer = forwardRef<
  HTMLDivElement,
  SpacerProps
>(function Spacer(
  {
    style,
    children,
    ...props
  },
  ref,
) {
  const { theme } = useTheme();

  const recipe = spacerRecipe(
    theme,
    props,
  );

  return (
    <Box
      ref={ref}
      aria-hidden="true"
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

Spacer.displayName = "Spacer";