import { createRecipe } from "@/design-system/foundation/recipes";
import { createMotion } from "@/design-system/foundation/motion";

import type { AvatarProps } from "./Avatar.types";

export const avatarRecipe =
  createRecipe<AvatarProps>({
    recipe(theme, props) {
      const size = props.size ?? "md";

      const sizes: Record<
        NonNullable<AvatarProps["size"]>,
        {
          dimension: string;
          fontSize: string;
        }
      > = {
        xs: {
          dimension: "24px",
          fontSize: "10px",
        },

        sm: {
          dimension: "32px",
          fontSize: "12px",
        },

        md: {
          dimension: "40px",
          fontSize: "14px",
        },

        lg: {
          dimension: "56px",
          fontSize: "18px",
        },

        xl: {
          dimension: "72px",
          fontSize: "24px",
        },
      };

      const current = sizes[size];

      return {
        style: {
          display: "inline-flex",

          alignItems: "center",

          justifyContent: "center",

          width: current.dimension,

          height: current.dimension,

          overflow: "hidden",

          flexShrink: 0,

          borderRadius: props.rounded
            ? "9999px"
            : "8px",

          background: theme.colors.surface,

          color: theme.colors.text,

          border: `1px solid ${theme.colors.border}`,

          fontWeight: 600,

          fontSize: current.fontSize,

          userSelect: "none",

          transition: createMotion(),
        },
      };
    },
  });