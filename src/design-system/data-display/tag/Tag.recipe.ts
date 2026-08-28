import { createRecipe } from "@/design-system/foundation/recipes";
import { createMotion } from "@/design-system/foundation/motion";

import type { TagProps } from "./Tag.types";

export const tagRecipe = createRecipe<TagProps>({
  recipe(theme, props) {
    const variant = props.variant ?? "primary";
    const size = props.size ?? "md";

    const variants: Record<
      NonNullable<TagProps["variant"]>,
      {
        background: string;
        color: string;
      }
    > = {
      primary: {
        background: theme.colors.primary,
        color: theme.colors.onPrimary,
      },

      secondary: {
        background: theme.colors.secondary,
        color: theme.colors.onSecondary,
      },

      success: {
        background: theme.colors.success,
        color: theme.colors.onSuccess,
      },

      warning: {
        background: theme.colors.warning,
        color: theme.colors.onWarning,
      },

      danger: {
        background: theme.colors.danger,
        color: theme.colors.onDanger,
      },

      info: {
        background: theme.colors.info,
        color: theme.colors.onInfo,
      },
    };

    const sizes = {
      sm: {
        padding: "2px 8px",
        fontSize: "11px",
      },

      md: {
        padding: "4px 10px",
        fontSize: "12px",
      },

      lg: {
        padding: "6px 14px",
        fontSize: "14px",
      },
    };

    return {
      style: {
        display: "inline-flex",

        alignItems: "center",

        justifyContent: "center",

        borderRadius: props.rounded ? "9999px" : "8px",

        background: variants[variant].background,

        color: variants[variant].color,

        padding: sizes[size].padding,

        fontSize: sizes[size].fontSize,

        fontWeight: 500,

        whiteSpace: "nowrap",

        userSelect: "none",

        transition: createMotion(),
      },
    };
  },
});
