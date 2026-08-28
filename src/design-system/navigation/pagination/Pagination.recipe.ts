import { createMotion } from "@/design-system/foundation/motion";
import { createRecipe } from "@/design-system/foundation/recipes";

import type { PaginationProps } from "./Pagination.types";

export const paginationRecipe = createRecipe<PaginationProps>({
  recipe(theme) {
    return {
      style: {
        display: "flex",

        alignItems: "center",

        gap: "8px",

        width: "100%",

        color: theme.colors.text,

        transition: createMotion(),
      },
    };
  },
});
