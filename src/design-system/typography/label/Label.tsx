import { createElement, forwardRef } from "react";

import { Box } from "@/design-system/layout/box";

import { useTheme } from "@/theme/hooks";

import { labelRecipe } from "./Label.recipe";

import type { LabelProps } from "./Label.types";

export const Label = forwardRef<HTMLDivElement, LabelProps>(function Label(
  { as = "label", required = false, style, children, ...props },
  ref,
) {
  const { theme } = useTheme();

  const recipe = labelRecipe(theme, props);

  return (
    <Box
      as={as}
      ref={ref}
      {...props}
      style={{
        ...recipe.style,
        ...style,
      }}
    >
      {children}

      {required &&
        createElement(
          "span",
          {
            style: {
              color: theme.colors.primary,
              marginLeft: 4,
              fontWeight: 700,
            },
          },
          "*",
        )}
    </Box>
  );
});

Label.displayName = "Label";
