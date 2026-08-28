import type { Recipe } from "@/design-system/foundation/contracts";

export const boxRecipe: Recipe = () => ({
  style: {
    boxSizing: "border-box",
    minWidth: 0,
  },
});
