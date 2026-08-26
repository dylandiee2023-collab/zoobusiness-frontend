import type { PropsWithChildren } from "react";

import type {
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

export type ThemeMode =
  | "system"
  | "light"
  | "dark"
  | "glass"
  | "high-contrast";

export type ThemeProviderProps = PropsWithChildren;

/**
 * Shared semantic token types
 */
export type SemanticColors = typeof semanticColors.light | typeof semanticColors.dark;
export type SemanticSpacing = typeof semanticSpacing;
export type SemanticRadius = typeof semanticRadius;
export type SemanticTypography = typeof semanticTypography;
export type SemanticShadows = typeof semanticShadows;
export type SemanticBorders = typeof semanticBorders;
export type SemanticOpacity = typeof semanticOpacity;
export type SemanticMotion = typeof semanticMotion;
export type SemanticZIndex = typeof semanticZIndex;
export type SemanticContainers = typeof semanticContainers;
export type SemanticGrid = typeof semanticGrid;
export type SemanticIconSizes = typeof semanticIconSizes;
export type SemanticComponentSizes = typeof semanticComponentSizes;

export interface Theme {
  id: string;
  name: string;
  mode: ThemeMode;

  colors: SemanticColors;
  spacing: SemanticSpacing;
  radius: SemanticRadius;
  typography: SemanticTypography;
  shadows: SemanticShadows;
  borders: SemanticBorders;
  opacity: SemanticOpacity;
  motion: SemanticMotion;
  zIndex: SemanticZIndex;
  containers: SemanticContainers;
  grid: SemanticGrid;
  iconSizes: SemanticIconSizes;
  componentSizes: SemanticComponentSizes;
}
export interface ThemeContextValue {
  theme: Theme;

  mode: ThemeMode;

  setMode: (mode: ThemeMode) => void;

  toggleMode: () => void;
}