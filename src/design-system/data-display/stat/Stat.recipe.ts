import { createRecipe } from "@/design-system/foundation/recipes";
import { createMotion } from "@/design-system/foundation/motion";

import type { StatProps } from "./Stat.types";

export const statRecipe = createRecipe<StatProps>({
  recipe(theme) {
    return {
      style: {
        display: "flex",

        flexDirection: "column",

        gap: "8px",

        padding: "16px",

        borderRadius: "12px",

        background: theme.colors.background,

        border: `1px solid ${theme.colors.border}`,

        transition: createMotion(),
      },
    };
  },
});
