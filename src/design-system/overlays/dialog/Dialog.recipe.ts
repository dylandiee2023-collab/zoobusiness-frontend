import {
  createRecipe,
} from "@/design-system/foundation/recipes";

import type {
  DialogProps,
} from "./Dialog.types";

export const dialogRecipe =
  createRecipe<DialogProps>({
    recipe(
      theme,
      props,
    ) {
      return {
        style: {
          position: "fixed",

          inset: 0,

          display: props.open
            ? "flex"
            : "none",

          alignItems: "center",

          justifyContent: "center",

          background:
            "rgba(0,0,0,.45)",

          zIndex:
            theme.zIndex.modal,
        },
      };
    },
  });