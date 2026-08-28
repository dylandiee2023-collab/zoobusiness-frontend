import { forwardRef } from "react";

import { Box } from "../box";

import { useTheme } from "@/theme/hooks";

import { dividerRecipe } from "./Divider.recipe";

import type { DividerProps } from "./Divider.types";

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider({ style, ...props }, ref) {
    const { theme } = useTheme();

    const recipe = dividerRecipe(theme, props);

    return (
      <Box
        ref={ref}
        aria-hidden="true"
        {...props}
        style={{
          ...recipe.style,
          ...style,
        }}
      />
    );
  },
);

Divider.displayName = "Divider";
