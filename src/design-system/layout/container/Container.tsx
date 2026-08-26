import { forwardRef } from "react";

import { Box } from "../box";

import { useTheme } from "@/theme/hooks";

import { containerRecipe } from "./Container.recipe";

import type { ContainerProps } from "./Container.types";

export const Container = forwardRef<
  HTMLDivElement,
  ContainerProps
>(function Container(
  {
    style,
    children,
    ...props
  },
  ref,
) {
  const { theme } = useTheme();

  const recipe = containerRecipe(
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

Container.displayName = "Container";