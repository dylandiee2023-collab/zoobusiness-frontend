import { createRecipe } from "@/design-system/foundation/recipes";

export interface AuthCardRecipeProps {
  readonly glass?: boolean;
}

export const authCardRecipe =
  createRecipe<AuthCardRecipeProps>({
    recipe(theme, props) {
      const glass = props.glass ?? true;

      return {
        style: {
          width: "100%",
          padding: theme.spacing.card,

          border: `${theme.borders.card} solid ${
            glass
              ? `color-mix(in srgb, ${theme.colors.border}, transparent ${theme.effects.glass.borderOpacity})`
              : theme.colors.border
          }`,

          borderRadius: theme.radius.dialog,

          background: glass
            ? `color-mix(in srgb, ${theme.colors.surface}, transparent ${theme.effects.glass.backgroundOpacity})`
            : theme.colors.surface,

          boxShadow: theme.shadows.floating,

          backdropFilter: glass
            ? `blur(${theme.effects.glassBlur})`
            : undefined,

          WebkitBackdropFilter: glass
            ? `blur(${theme.effects.glassBlur})`
            : undefined,

          color: theme.colors.text,

          boxSizing: "border-box",
        },
      };
    },
  });
