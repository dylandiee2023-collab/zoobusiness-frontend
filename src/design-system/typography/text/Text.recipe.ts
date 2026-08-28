import { typographyRecipe } from "@/design-system/typography/base";
import { createRecipe } from "@/design-system/foundation/recipes";
//import { typography } from "@/theme/tokens";

import type { TextProps } from "./Text.types";

export const textRecipe = createRecipe<TextProps>({
  recipe(theme, props) {
    const base = typographyRecipe(theme, props);

    return {
      style: {
        ...base.style,

        fontSize: props.size ?? theme.typography.body.fontSize,

        fontWeight: props.weight ?? theme.typography.body.fontWeight,
      },
    };
  },
});
