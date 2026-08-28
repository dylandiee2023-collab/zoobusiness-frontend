import { forwardRef } from "react";

import { Box } from "../box";

import { useTheme } from "@/theme/hooks";

import { surfaceRecipe } from "./Surface.recipe";

import type { SurfaceProps } from "./Surface.types";

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  function Surface({ style, children, ...props }, ref) {
    const { theme } = useTheme();

    const recipe = surfaceRecipe(theme, props);

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

Surface.displayName = "Surface";
