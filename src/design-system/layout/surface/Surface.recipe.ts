import { createRecipe } from "@/design-system/foundation/recipes";

import type { SurfaceProps } from "./Surface.types";

export const surfaceRecipe = createRecipe<SurfaceProps>({
  recipe(theme, props) {
    return {
      style: {
        background: props.background ?? theme.colors.surface,

        borderRadius: props.radius ?? theme.radius.card,

        boxShadow: props.shadow ?? theme.shadows.card,

        border: props.border ?? theme.borders.card,

        padding: props.padding ?? theme.spacing.card,

        boxSizing: "border-box",
      },
    };
  },
});
