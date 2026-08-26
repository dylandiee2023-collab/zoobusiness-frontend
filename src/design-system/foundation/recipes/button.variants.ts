import { createVariants } from "../variants";

import type { Theme } from "@/theme/types";

export function createButtonVariants(theme: Theme) {
  return createVariants({
    theme,
    defaultVariant: "solid",

    variants: {
      solid: {
        background: theme.colors.primary,
        color: "#FFFFFF",
        border: "none",
      },

      outline: {
        background: "transparent",
        color: theme.colors.primary,
        border: `1px solid ${theme.colors.primary}`,
      },

      ghost: {
        background: "transparent",
        color: theme.colors.primary,
        border: "none",
      },
    },
  });
}