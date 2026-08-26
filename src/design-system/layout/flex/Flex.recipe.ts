import { createRecipe } from "@/design-system/foundation/recipes";

import type { FlexProps } from "./Flex.types";

export const flexRecipe =
  createRecipe<FlexProps>({
    recipe(_, props) {
      return {
        style: {
          display: "flex",
          flexDirection: props.direction,
          alignItems: props.align,
          justifyContent: props.justify,
          flexWrap: props.wrap,
          gap: props.gap,
        },
      };
    },
  });