import { createRecipe } from "@/design-system/foundation/recipes";
import { createMotion } from "@/design-system/foundation/motion";

import type { BreadcrumbProps } from "./Breadcrumb.types";

export const breadcrumbRecipe =
  createRecipe<BreadcrumbProps>({
    recipe(theme) {
      return {
        style: {
          display: "flex",

          alignItems: "center",

          flexWrap: "wrap",

          gap: "8px",

          color: theme.colors.text,

          transition: createMotion(),
        },
      };
    },
  });