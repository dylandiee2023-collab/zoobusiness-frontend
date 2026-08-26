import { createRecipe } from "@/design-system/foundation/recipes";
import { createMotion } from "@/design-system/foundation/motion";

import type { SpinnerProps } from "./Spinner.types";

export const spinnerRecipe =
  createRecipe<SpinnerProps>({
    recipe(theme, props) {
      const size = props.size ?? "md";

      const sizes: Record<
        NonNullable<SpinnerProps["size"]>,
        {
          dimension: string;
          borderWidth: string;
        }
      > = {
        xs: {
          dimension: "12px",
          borderWidth: "2px",
        },

        sm: {
          dimension: "16px",
          borderWidth: "2px",
        },

        md: {
          dimension: "24px",
          borderWidth: "3px",
        },

        lg: {
          dimension: "32px",
          borderWidth: "4px",
        },

        xl: {
          dimension: "48px",
          borderWidth: "5px",
        },
      };

      const current = sizes[size];

      return {
        style: {
          display: "inline-block",

          width: current.dimension,

          height: current.dimension,

          borderRadius: "50%",

          border: `${current.borderWidth} solid ${theme.colors.border}`,

          borderTopColor:
            props.color ?? theme.colors.primary,

          animation:
            "zoobusiness-spinner 0.8s linear infinite",

          transition: createMotion(),

          flexShrink: 0,
        },
      };
    },
  });