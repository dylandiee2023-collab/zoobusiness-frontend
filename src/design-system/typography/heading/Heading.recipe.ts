import {
  createRecipe,
} from "@/design-system/foundation/recipes";

import {
  typographyRecipe,
} from "@/design-system/typography/base";

//import { typography,} from "@/theme/tokens";

import type {
  HeadingProps,
} from "./Heading.types";

export const headingRecipe =
  createRecipe<HeadingProps>({
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
            theme.typography.heading2.fontSize,

          fontWeight:
            props.weight ??
            theme.typography.heading2.fontWeight,

        },
      };
    },
  });