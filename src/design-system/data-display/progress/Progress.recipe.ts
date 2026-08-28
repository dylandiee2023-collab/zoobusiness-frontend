import { createRecipe } from "@/design-system/foundation/recipes";
import { createMotion } from "@/design-system/foundation/motion";

import type { ProgressProps } from "./Progress.types";

export const progressRecipe = createRecipe<ProgressProps>({
  recipe(theme, props) {
    const size = props.size ?? "md";

    const sizes: Record<
      NonNullable<ProgressProps["size"]>,
      {
        height: string;
      }
    > = {
      sm: {
        height: "4px",
      },

      md: {
        height: "8px",
      },

      lg: {
        height: "12px",
      },
    };

    return {
      style: {
        display: "block",

        width: "100%",

        overflow: "hidden",

        height: sizes[size].height,

        background: theme.colors.surface,

        border: `1px solid ${theme.colors.border}`,

        borderRadius: props.rounded ? "9999px" : "8px",

        transition: createMotion(),
      },
    };
  },
});
