import type { Theme } from "@/theme/types";

import type {
  RecipeOptions,
} from "./types";

export function createRecipe<
  Props = void,
  Variants extends Record<string, unknown> = Record<
    string,
    never
  >,
>(
  options: RecipeOptions<
    Props,
    Variants
  >,
) {
  return (
    theme: Theme,
    props: Props,
  ) => {
    return options.recipe(
      theme,
      props,
    );
  };
}