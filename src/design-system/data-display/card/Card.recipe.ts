import { createRecipe } from "@/design-system/foundation/recipes";
import { createMotion } from "@/design-system/foundation/motion";

import type { CardProps } from "./Card.types";

export const cardRecipe =
  createRecipe<CardProps>({
    recipe(theme, props) {
      const variant =
        props.variant ?? "elevated";

      const variants: Record<
        NonNullable<CardProps["variant"]>,
        {
          background: string;
          border: string;
          boxShadow: string;
        }
      > = {
        elevated: {
          background: theme.colors.background,
          border: theme.colors.border,
          boxShadow:
            "0 4px 12px rgba(0,0,0,.08)",
        },

        outlined: {
          background: theme.colors.background,
          border: theme.colors.border,
          boxShadow: "none",
        },

        filled: {
          background: theme.colors.surface,
          border: theme.colors.surface,
          boxShadow: "none",
        },
      };

      const current = variants[variant];

      return {
        style: {
          display: "flex",

          flexDirection: "column",

          width: props.fullWidth
            ? "100%"
            : undefined,

          background:
            current.background,

          border: `1px solid ${current.border}`,

          borderRadius: "12px",

          padding: "16px",

          boxShadow:
            current.boxShadow,

          transition: createMotion(),
        },
      };
    },
  });