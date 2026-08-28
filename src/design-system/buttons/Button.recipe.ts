import { createRecipe } from "@/design-system/foundation/recipes";

import { buttonTokens } from "@/theme/tokens";

import type { ButtonProps } from "./Button.types";

import { createMotion } from "@/design-system/foundation/motion";

export const buttonRecipe = createRecipe<ButtonProps>({
  recipe(theme, props) {
    const size = buttonTokens.size[props.size ?? "md"];

    const variant = buttonTokens.variant[props.variant ?? "primary"];

    const background =
      variant.background === "transparent"
        ? "transparent"
        : theme.colors[variant.background];

    const border =
      variant.border === "transparent"
        ? "transparent"
        : theme.colors[variant.border];

    const color = theme.colors[variant.color];

    return {
      style: {
        display: "inline-flex",

        alignItems: "center",

        justifyContent: "center",

        gap: size.gap,

        height: size.height,

        padding: `0 ${size.paddingX}`,

        borderRadius: size.radius,

        fontSize: size.fontSize,

        fontWeight: 600,

        border: `1px solid ${border}`,

        background,

        color,

        cursor: props.loading
          ? buttonTokens.state.loading.cursor
          : props.disabled
            ? buttonTokens.state.disabled.cursor
            : "pointer",

        opacity: props.loading
          ? buttonTokens.state.loading.opacity
          : props.disabled
            ? buttonTokens.state.disabled.opacity
            : 1,

        width: props.fullWidth ? "100%" : undefined,

        transition: createMotion({
          property: "all",
          duration: "fast",
          easing: "ease",
        }),

        userSelect: "none",

        outline: "none",
      },
    };
  },
});
