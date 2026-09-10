import { createRecipe } from "@/design-system/foundation/recipes";

import type { OtpInputProps } from "./OtpInput.types";

export const otpInputRecipe = createRecipe<OtpInputProps>({
  recipe(theme) {
    return {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.inline,
        width: "100%",
      },
    };
  },
});
