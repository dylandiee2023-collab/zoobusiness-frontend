import type { Theme } from "@/theme/types";

import type {
  ColorScheme,
  Variant,
} from "../types";

export function getVariant(
  theme: Theme,
  color: ColorScheme,
  variant: Variant,
) {
  return {
    color,
    variant,
    palette: theme.colors,
  };
}