import { createMotion } from "@/design-system/foundation/motion";
import { createRecipe } from "@/design-system/foundation/recipes";

import type { StepperProps } from "./Stepper.types";

export const stepperRecipe = createRecipe<StepperProps>({
  recipe(theme) {
    return {
      style: {
        display: "flex",

        alignItems: "center",

        width: "100%",

        gap: "16px",

        color: theme.colors.text,

        transition: createMotion(),
      },
    };
  },
});
