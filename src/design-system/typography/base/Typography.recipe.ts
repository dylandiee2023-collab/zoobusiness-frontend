import {
  createRecipe,
} from "@/design-system/foundation/recipes";

import {
  typography,
} from "@/theme/tokens";

import type {
  TypographyProps,
} from "./Typography.types";

export const typographyRecipe =
  createRecipe<TypographyProps>({
    recipe(
      theme,
      props,
    ) {
      return {
        style: {
          color:
            props.color ??
            theme.colors.text,

          fontSize:
            props.size,

          fontWeight:
            props.weight ??
            typography.fontWeight.regular,

          lineHeight:
            props.lineHeight ??
            typography.lineHeight.normal,

          letterSpacing:
            props.letterSpacing,

          textAlign:
            props.align,

          textTransform:
            props.transform,

          textDecoration:
            props.decoration,

          ...(props.truncate && {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }),
        },
      };
    },
  });