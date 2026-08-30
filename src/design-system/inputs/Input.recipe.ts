import { createRecipe } from "@/design-system/foundation/recipes";

import type { InputProps } from "./Input.types";

import { createMotion } from "@/design-system/foundation/motion";

export const inputRecipe = createRecipe<InputProps>({
  recipe(theme, props) {
    return {
      style: {
        width: props.fullWidth ? "100%" : undefined,

        height: theme.componentSizes.input.md,

        padding: `0 ${theme.spacing.input}`,

        borderRadius: theme.radius.input,

        border: `1px solid ${
          props.invalid ? theme.colors.danger : theme.colors.border
        }`,

        background: theme.colors.surface,

        color: theme.colors.text,

        outline: "none",

        fontSize: theme.typography.body.fontSize,

        transition: createMotion({
          property: "all",
          duration: "fast",
          easing: "ease",
        }),

        opacity: props.disabled ? theme.opacity.disabled : 1,

        boxSizing: "border-box",
      },
    };
  },
});
