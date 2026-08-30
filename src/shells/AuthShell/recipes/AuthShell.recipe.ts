import { createRecipe } from "@/design-system/foundation/recipes";

export interface AuthShellRecipeProps {
  readonly glass?: boolean;
}

export const authShellRecipe = createRecipe<AuthShellRecipeProps>({
  recipe(theme, props) {
    const glass = props.glass ?? true;

    return {
      style: {
        width: "100%",
        height: "100dvh",
        minHeight: 0,
        boxSizing: "border-box",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        overflow: "hidden",
        overscrollBehavior: "none",

        padding: theme.spacing.page,

        background: glass
          ? `
            radial-gradient(
              circle at 20% 20%,
              color-mix(
                in srgb,
                ${theme.colors.primary} ${theme.effects.glass.primaryGlow},
                transparent
              ),
              transparent ${theme.effects.glass.gradientStop}
            ),
            radial-gradient(
              circle at 80% 80%,
              color-mix(
                in srgb,
                ${theme.colors.info} ${theme.effects.glass.infoGlow},
                transparent
              ),
              transparent ${theme.effects.glass.gradientStop}
            ),
            ${theme.colors.background}
          `
          : theme.colors.background,

        color: theme.colors.text,
      },
    };
  },
});
