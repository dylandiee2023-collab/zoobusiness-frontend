import type { Theme } from "@/theme/types";

import type { StyleObject } from "../contracts";

export type VariantStyle = StyleObject;

export type VariantMap = Record<
  string,
  VariantStyle
>;

export interface VariantOptions {
  theme: Theme;
  variants: VariantMap;
  defaultVariant: string;
}