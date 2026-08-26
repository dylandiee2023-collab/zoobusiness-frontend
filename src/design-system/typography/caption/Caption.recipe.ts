import {
  createRecipe,
} from "@/design-system/foundation/recipes";

import {
  typographyRecipe,
} from "@/design-system/typography/base";

import type {
  CaptionProps,
} from "./Caption.types";

export const captionRecipe =
  createRecipe<CaptionProps>({
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
            theme.typography.caption.fontSize,

          fontWeight:
            props.weight ??
            theme.typography.caption.fontWeight,

          color:
            props.color ??
            theme.colors.textMuted,

        },
      };
    },
  });