import { createRecipe } from "@/design-system/foundation/recipes";
import { createMotion } from "@/design-system/foundation/motion";

import type { AlertProps } from "./Alert.types";

export const alertRecipe = createRecipe<AlertProps>({
  recipe(theme, props) {
    const variant = props.variant ?? "info";

    const variants: Record<
      NonNullable<AlertProps["variant"]>,
      {
        background: string;
        border: string;
        color: string;
      }
    > = {
      success: {
        background: theme.colors.success,
        border: theme.colors.success,
        color: theme.colors.onSuccess,
      },

      info: {
        background: theme.colors.info,
        border: theme.colors.info,
        color: theme.colors.onInfo,
      },

      warning: {
        background: theme.colors.warning,
        border: theme.colors.warning,
        color: theme.colors.onWarning,
      },

      error: {
        background: theme.colors.danger,
        border: theme.colors.danger,
        color: theme.colors.onDanger,
      },
    };

    const colors = variants[variant];

    return {
      style: {
        display: "flex",

        alignItems: "flex-start",

        gap: "12px",

        width: props.fullWidth ? "100%" : undefined,

        padding: "16px",

        borderRadius: "8px",

        border: `1px solid ${colors.border}`,

        background: colors.background,

        color: colors.color,

        transition: createMotion(),

        userSelect: "none",
      },
    };
  },
});
