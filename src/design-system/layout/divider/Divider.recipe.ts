import { createRecipe } from "@/design-system/foundation/recipes";

import type { DividerProps } from "./Divider.types";

export const dividerRecipe =
  createRecipe<DividerProps>({
    recipe(theme, props) {
      const horizontal =
        props.orientation !== "vertical";

      const thickness =
        props.thickness ?? "1px";

      return {
        style: horizontal
          ? {
              width: props.length ?? "100%",
              height: thickness,
              backgroundColor:
                props.color ??
                theme.colors.border,
              flexShrink: 0,
            }
          : {
              width: thickness,
              height: props.length ?? "100%",
              backgroundColor:
                props.color ??
                theme.colors.border,
              flexShrink: 0,
            },
      };
    },
  });