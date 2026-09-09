import { forwardRef } from "react";

import { Box } from "../box";

import { useTheme } from "@/theme/hooks";

import { containerRecipe } from "./Container.recipe";

import type { ContainerProps } from "./Container.types";

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(
    { style, children, maxWidth, padding, center, ...props },
    ref,
  ) {
    const { theme } = useTheme();

    const recipeProps: ContainerProps = {
      ...props,
      ...(maxWidth !== undefined ? { maxWidth } : {}),
      ...(padding !== undefined ? { padding } : {}),
      ...(center !== undefined ? { center } : {}),
    };
    const recipe = containerRecipe(theme, recipeProps);

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
  },
);

Container.displayName = "Container";
