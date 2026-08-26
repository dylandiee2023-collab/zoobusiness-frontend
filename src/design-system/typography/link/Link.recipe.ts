import {
  createRecipe,
} from "@/design-system/foundation/recipes";

import {
  typographyRecipe,
} from "@/design-system/typography/base";

import {
  typography,
} from "@/theme/tokens";

import type {
  LinkProps,
} from "./Link.types";

export const linkRecipe =
  createRecipe<LinkProps>({
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

          color:
            props.color ??
            theme.colors.primary,

          fontWeight:
            props.weight ??
            typography.fontWeight.medium,

          textDecoration:
            props.underline
              ? "underline"
              : "none",

          cursor: "pointer",

          transition:
            "color 150ms ease",

        },
      };
    },
  });