import { createRecipe } from "@/design-system/foundation/recipes";

export interface AuthCardRecipeProps {
  readonly glass?: boolean;
}

export const authCardRecipe = createRecipe<AuthCardRecipeProps>({
  recipe(theme) {
    return {
      style: {
        width: "100%",
        maxWidth: 460,
        padding: "32px",
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.dialog,
        background: theme.colors.surface,
        boxShadow: theme.shadows.floating,
        color: theme.colors.text,
        boxSizing: "border-box",
      },
    };
  },
});
