import type { ComponentPropsWithoutRef, ElementType } from "react";

import type { Theme } from "@/theme/types";

import type { StyleObject } from "./style.types";

export interface ComponentRecipeResult {
  className?: string;
  style: StyleObject;
}

export type ComponentRecipe<Props extends object = Record<string, never>> = (
  theme: Theme,
  props: Props,
) => ComponentRecipeResult;

export interface BaseComponentProps {
  className?: string;
  style?: StyleObject;
}

export type ComponentProps<
  T extends ElementType,
  Props extends object = Record<string, never>,
> = Props &
  BaseComponentProps &
  Omit<ComponentPropsWithoutRef<T>, keyof Props | keyof BaseComponentProps>;
