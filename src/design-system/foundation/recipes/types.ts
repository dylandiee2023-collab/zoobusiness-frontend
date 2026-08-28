import type { Theme } from "@/theme/types";

import type { BaseRecipeResult } from "./recipe.types";

export interface RecipeOptions<
  Props = void,
  Variants extends Record<string, unknown> = Record<string, never>,
> {
  recipe: (theme: Theme, props: Props) => BaseRecipeResult;

  variants?: Variants;

  defaultVariants?: Partial<Variants>;

  compoundVariants?: ReadonlyArray<{
    variants: Partial<Variants>;
    styles: BaseRecipeResult["style"];
  }>;
}
