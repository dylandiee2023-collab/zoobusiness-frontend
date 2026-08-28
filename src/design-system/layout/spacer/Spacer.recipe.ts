import { createRecipe } from "@/design-system/foundation/recipes";

import type { SpacerProps } from "./Spacer.types";

export const spacerRecipe = createRecipe<SpacerProps>({
  recipe(_, props) {
    const size = props.size ?? "1rem";

    return {
      style:
        props.direction === "vertical"
          ? {
              width: "100%",
              height: size,
              flexShrink: 0,
            }
          : {
              width: size,
              height: "100%",
              flexShrink: 0,
              display: "inline-block",
            },
    };
  },
});
