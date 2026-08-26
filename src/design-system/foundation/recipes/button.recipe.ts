import { createRecipe } from "./createRecipe";
import { createButtonStates } from "./button.states";
import { createButtonVariants } from "./button.variants";
import { buttonCompoundVariants } from "./button.compound";
import { composeStyles } from "../style-composer";

export type ButtonVariant =
  | "solid"
  | "outline"
  | "ghost";

export type ButtonSize =
  | "sm"
  | "md"
  | "lg";

export interface ButtonRecipeProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
}

export const buttonRecipe =
  createRecipe<ButtonRecipeProps>({
    recipe(theme, props) {
      const {
        variant = "solid",
        size = "md",
        disabled = false,
        loading = false,
      } = props;

      const height =
        theme.componentSizes.button[size];

      const variants =
        createButtonVariants(theme);

      const variantStyle =
        variants(variant);

      const states =
        createButtonStates(theme);

      const stateStyle = disabled
        ? states("disabled")
        : states("base");

      const compoundStyle =
        buttonCompoundVariants({
          variant,
          disabled,
          loading,
        });

      return {
        style: composeStyles(
          {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",

            height,

            borderRadius:
              theme.radius.button,

            transitionDuration:
              theme.motion.transition,

            userSelect: "none",

            outline: "none",
          },
          variantStyle,
          stateStyle,
          compoundStyle,
        ),
      };
    },
  });