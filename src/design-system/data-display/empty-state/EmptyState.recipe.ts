import { createRecipe } from "@/design-system/foundation/recipes";
import { createMotion } from "@/design-system/foundation/motion";

import type { EmptyStateProps } from "./EmptyState.types";

export const emptyStateRecipe =
  createRecipe<EmptyStateProps>({
    recipe(theme) {
      return {
        style: {
          display: "flex",

          flexDirection: "column",

          alignItems: "center",

          justifyContent: "center",

          textAlign: "center",

          gap: "16px",

          width: "100%",

          padding: "32px",

          borderRadius: "16px",

          background:
            theme.colors.background,

          border: `1px dashed ${theme.colors.border}`,

          transition: createMotion(),
        },
      };
    },
  });