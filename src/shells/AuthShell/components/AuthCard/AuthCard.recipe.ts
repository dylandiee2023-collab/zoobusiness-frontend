import { createRecipe } from "@/design-system/foundation/recipes";

export interface AuthCardRecipeProps {
  readonly glass?: boolean;
}

export const authCardRecipe =
  createRecipe<AuthCardRecipeProps>({
    recipe(theme) {
      return {
        style: {
          width: "100%",
          padding: theme.spacing.card,

          border: `${theme.borders.card} solid ${theme.colors.border}`,

          borderRadius: theme.radius.dialog,

          background: theme.colors.surface,

          boxShadow: theme.shadows.floating,

          color: theme.colors.text,

          boxSizing: "border-box",
        },
      };
    },
  });
