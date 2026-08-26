import type { Theme } from "@/theme/types";
import type { StyleObject } from "../contracts";

export interface BaseRecipeResult {
  className?: string;
  style: StyleObject;
}

export type Recipe<Props = void> =
  Props extends void
    ? (theme: Theme) => BaseRecipeResult
    : (theme: Theme, props: Props) => BaseRecipeResult;