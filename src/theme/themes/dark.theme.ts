import type { Theme } from "@/theme/types";

import {
  semanticBorders,
  semanticColors,
  semanticComponentSizes,
  semanticContainers,
  semanticGrid,
  semanticIconSizes,
  semanticMotion,
  semanticOpacity,
  semanticRadius,
  semanticShadows,
  semanticSpacing,
  semanticTypography,
  semanticZIndex,
} from "@/theme/tokens/semantic";

export const darkTheme: Theme = {
  id: "dark",
  name: "Dark",
  mode: "dark",

  colors: semanticColors.dark,
  spacing: semanticSpacing,
  radius: semanticRadius,
  typography: semanticTypography,
  shadows: semanticShadows,
  borders: semanticBorders,
  opacity: semanticOpacity,
  motion: semanticMotion,
  zIndex: semanticZIndex,
  containers: semanticContainers,
  grid: semanticGrid,
  iconSizes: semanticIconSizes,
  componentSizes: semanticComponentSizes,
};