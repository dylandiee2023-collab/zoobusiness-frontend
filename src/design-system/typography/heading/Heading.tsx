import { forwardRef } from "react";

import { Box } from "@/design-system/layout/box";

import { useTheme } from "@/theme/hooks";

import { headingRecipe } from "./Heading.recipe";

import type { HeadingProps } from "./Heading.types";

export const Heading = forwardRef<HTMLDivElement, HeadingProps>(
  function Heading({ level = 1, as, style, children, ...props }, ref) {
    const { theme } = useTheme();

    const recipe = headingRecipe(theme, {
      level,
      ...props,
    });

    const tag = as ?? (`h${level}` as const);

    return (
      <Box
        as={tag}
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

Heading.displayName = "Heading";
