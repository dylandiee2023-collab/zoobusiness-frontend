import {
  createRecipe,
} from "@/design-system/foundation/recipes";

import {
  typographyRecipe,
} from "@/design-system/typography/base";

import type {
  LabelProps,
} from "./Label.types";

export const labelRecipe =
  createRecipe<LabelProps>({
    recipe(
      theme,
      props,
    ) {

      const base =
        typographyRecipe(
          theme,
          props,
        );

      return {
        style: {

          ...base.style,

          fontSize:
            props.size ??
            theme.typography.bodySmall.fontSize,

          fontWeight:
            props.weight ??
            theme.typography.bodySmall.fontWeight,

        },
      };
    },
  });