import type {
  ComponentType,
} from "react";

import type { Theme } from "@/theme/types";

import type {
  StyleObject,
} from "../contracts";

export interface RecipeResult {
  className?: string;
  style: StyleObject;
}

export interface CreateComponentOptions<Props> {
  displayName: string;

  recipe: (
    theme: Theme,
    props: Props,
  ) => RecipeResult;

  render: ComponentType<Props>;
}