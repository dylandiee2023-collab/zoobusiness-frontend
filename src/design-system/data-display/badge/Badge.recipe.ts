import { createRecipe } from "@/design-system/foundation/recipes";
import { createMotion } from "@/design-system/foundation/motion";

import type { BadgeProps } from "./Badge.types";

export const badgeRecipe = createRecipe<BadgeProps>({
  recipe(theme, props) {
    const variant = props.variant ?? "primary";
    const size = props.size ?? "md";
    const variants = {
      primary: {
        background: theme.colors.primary,
        color: theme.colors.background,
      },

      secondary: {
        background: theme.colors.surface,
        color: theme.colors.text,
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
    } as const;

    const sizes = {
      sm: {
        fontSize: "11px",
        padding: "2px 6px",
      },

      md: {
        fontSize: "12px",
        padding: "4px 8px",
      },

      lg: {
        fontSize: "14px",
        padding: "6px 12px",
      },
    };

    return {
      style: {
        display: "inline-flex",

        alignItems: "center",

        justifyContent: "center",

        fontWeight: 600,

        whiteSpace: "nowrap",

        userSelect: "none",

        borderRadius: props.rounded ? "9999px" : "6px",

        background: variants[variant].background,

        color: variants[variant].color,

        fontSize: sizes[size].fontSize,

        padding: sizes[size].padding,

        transition: createMotion(),
      },
    };
  },
});
