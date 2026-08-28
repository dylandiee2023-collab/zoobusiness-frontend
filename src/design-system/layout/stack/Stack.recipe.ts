import { createRecipe } from "@/design-system/foundation/recipes";

import type { StackProps } from "./Stack.types";

export const stackRecipe = createRecipe<StackProps>({
  recipe(_, props) {
    return {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: props.spacing,
        justifyContent: props.justify,
        alignItems: props.align,
        flexWrap: props.wrap,
      },
    };
  },
});
