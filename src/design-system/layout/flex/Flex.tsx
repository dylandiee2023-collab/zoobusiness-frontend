import { forwardRef } from "react";

import { Box } from "../box/Box";

import { flexRecipe } from "./Flex.recipe";

import { useTheme } from "@/theme/hooks";

import type { FlexProps } from "./Flex.types";

export const Flex = forwardRef<
  HTMLDivElement,
  FlexProps
>(function Flex(
  {
    style,
    children,
    ...props
  },
  ref,
) {
  const { theme } = useTheme();

  const recipe = flexRecipe(
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

Flex.displayName = "Flex";