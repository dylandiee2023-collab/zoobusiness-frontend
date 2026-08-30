import { createRecipe } from "@/design-system/foundation/recipes";

import { typographyRecipe } from "@/design-system/typography/base";

import type { HeadingProps } from "./Heading.types";

export const headingRecipe = createRecipe<HeadingProps>({
  recipe(theme, props) {
    const level = props.level ?? 1;

    const semantic =
      level === 1
        ? theme.typography.heading1
        : level === 2
          ? theme.typography.heading2
          : theme.typography.heading3;

    const base = typographyRecipe(theme, props);

    return {
      style: {
        ...base.style,

        fontFamily: props.style?.fontFamily ?? semantic.fontFamily,

        fontSize: props.size ?? semantic.fontSize,

        fontWeight: props.weight ?? semantic.fontWeight,

        lineHeight: props.lineHeight ?? semantic.lineHeight,

        letterSpacing:
          props.letterSpacing ?? semantic.letterSpacing,
      },
    };
  },
});
