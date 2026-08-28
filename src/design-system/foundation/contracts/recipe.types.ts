import type { Theme } from "@/theme/types";

import type { StyleObject } from "./style.types";

export interface RecipeResult {
  className?: string;
  style: StyleObject;
}

export type Recipe<Props extends object = Record<string, never>> = (
  theme: Theme,
  props: Props,
) => RecipeResult;
