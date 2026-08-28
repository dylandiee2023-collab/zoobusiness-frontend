import { createRecipe } from "@/design-system/foundation/recipes";

import { typographyRecipe } from "@/design-system/typography/base";

import { typography } from "@/theme/tokens";

import type { CodeProps } from "./Code.types";

export const codeRecipe = createRecipe<CodeProps>({
  recipe(theme, props) {
    const base = typographyRecipe(theme, props);

    return {
      style: {
        ...base.style,

        fontFamily: typography.fontFamily.mono,

        fontSize: props.size ?? theme.typography.caption.fontSize,

        fontWeight: props.weight ?? theme.typography.caption.fontWeight,

        backgroundColor: theme.colors.surfaceSecondary,

        color: props.color ?? theme.colors.text,

        padding: "2px 6px",

        borderRadius: "4px",

        whiteSpace: props.block ? "pre-wrap" : "nowrap",

        display: props.block ? "block" : "inline-block",

        overflowX: props.block ? "auto" : undefined,
      },
    };
  },
});
