import { useTheme } from "@/theme/hooks";

import { authCardRecipe } from "./AuthCard.recipe";

import type { AuthCardProps } from "./AuthCard.types";

export function AuthCard({ children, glass = true }: AuthCardProps) {
  const { theme } = useTheme();

  const recipe = authCardRecipe(theme, {
    glass,
  });

  return <section style={recipe.style}>{children}</section>;
}
