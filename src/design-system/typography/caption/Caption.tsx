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
  captionRecipe,
} from "./Caption.recipe";

import type {
  CaptionProps,
} from "./Caption.types";

export const Caption = forwardRef<
  HTMLDivElement,
  CaptionProps
>(function Caption(
  {
    as = "span",
    style,
    children,
    ...props
  },
  ref,
) {

  const { theme } =
    useTheme();

  const recipe =
    captionRecipe(
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

Caption.displayName = "Caption";