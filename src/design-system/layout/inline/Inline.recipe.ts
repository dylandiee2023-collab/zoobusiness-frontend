import { createRecipe } from "@/design-system/foundation/recipes";

import type { InlineProps } from "./Inline.types";

export const inlineRecipe = createRecipe<InlineProps>({
  recipe(_, props) {
    return {
      style: {
        display: "flex",
        flexDirection: "row",
        gap: props.spacing,
        justifyContent: props.justify,
        alignItems: props.align,
        flexWrap: props.wrap ?? "wrap",
      },
    };
  },
});
