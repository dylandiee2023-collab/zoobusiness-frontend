import { createRecipe } from "@/design-system/foundation/recipes";

import type { CenterProps } from "./Center.types";

export const centerRecipe = createRecipe<CenterProps>({
  recipe() {
    return {
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    };
  },
});
