import {
  createRecipe,
} from "@/design-system/foundation/recipes";

import type {
  InputProps,
} from "./Input.types";

import {
  createMotion,
} from "@/design-system/foundation/motion";

export const inputRecipe =
  createRecipe<InputProps>({
    recipe(
      theme,
      props,
    ) {
      return {
        style: {
          width: props.fullWidth
            ? "100%"
            : undefined,

          height: "40px",

          padding: "0 12px",

          borderRadius: "8px",

          border: `1px solid ${
            props.invalid
              ? theme.colors.danger
              : theme.colors.border
          }`,

          background:
            theme.colors.background,

          color:
            theme.colors.text,

          outline: "none",

          fontSize: "16px",

          transition: createMotion({
            property: "all",
            duration: "fast",
            easing: "ease",
          }),

          opacity:
            props.disabled
              ? 0.6
              : 1,
        },
      };
    },
  });