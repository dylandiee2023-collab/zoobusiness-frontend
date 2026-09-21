import { createRecipe } from "@/design-system/foundation/recipes";

export interface AuthShellRecipeProps {
  readonly glass?: boolean;
}

export const authShellRecipe = createRecipe<AuthShellRecipeProps>({
  recipe(theme, props) {
    const glass = props.glass ?? false;

    return {
      style: {
        width: "100%",
        minHeight: "100dvh",
        boxSizing: "border-box",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        overflowX: "hidden",
        overflowY: "auto",
        overscrollBehavior: "none",

        padding: theme.spacing.page,

        background: glass
          ? `radial-gradient(
              circle at 15% 10%,
              color-mix(
                in srgb,
                ${theme.colors.primary} 12%,
                transparent
              ),
              transparent 34%
            ),
            radial-gradient(
              circle at 85% 90%,
              color-mix(
                in srgb,
                ${theme.colors.info} 8%,
                transparent
              ),
              transparent 38%
            ),
            ${theme.colors.background}`
          : theme.colors.background,

        color: theme.colors.text,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        textRendering: "optimizeLegibility",
        WebkitFontSmoothing: "antialiased",
      },
    };
  },
});
