import { createRecipe } from "@/design-system/foundation/recipes";

import type { ContainerProps } from "./Container.types";

export const containerRecipe =
  createRecipe<ContainerProps>({
    recipe(theme, props) {
      return {
        style: {
          width: "100%",

          maxWidth:
            props.maxWidth ??
            theme.containers.page,

          padding:
            props.padding ??
            theme.spacing.page,

          marginLeft:
            props.center === false
              ? undefined
              : "auto",

          marginRight:
            props.center === false
              ? undefined
              : "auto",

          boxSizing: "border-box",
        },
      };
    },
  });