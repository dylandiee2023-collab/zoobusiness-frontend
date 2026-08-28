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

export const lightTheme: Theme = {
  id: "light",
  name: "Light",
  mode: "light",

  colors: semanticColors.light,
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
