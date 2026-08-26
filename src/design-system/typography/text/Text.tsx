import {
  forwardRef,
} from "react";

import {
  Box,
} from "@/design-system/layout/box";

import {
  useTheme,
} from "@/theme/hooks";

import {
  textRecipe,
} from "./Text.recipe";

import type {
  TextProps,
} from "./Text.types";

export const Text = forwardRef<
  HTMLDivElement,
  TextProps
>(function Text(
  {
    as = "p",
    style,
    children,
    ...props
  },
  ref,
) {
  const { theme } =
    useTheme();

  const recipe =
    textRecipe(
      theme,
      props,
    );

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
    </Box>
  );
});

Text.displayName = "Text";