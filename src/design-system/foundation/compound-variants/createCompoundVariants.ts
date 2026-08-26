import type { CompoundVariant } from "./types";
import type { StyleObject } from "../contracts";

export function createCompoundVariants(
  variants: CompoundVariant[],
) {
  return (
    props: Record<string, unknown>,
  ): StyleObject => {
    const styles: StyleObject = {};

    for (const variant of variants) {
      const matched = Object.entries(
        variant.when,
      ).every(
        ([key, value]) => props[key] === value,
      );

      if (matched) {
        Object.assign(styles, variant.styles);
      }
    }

    return styles;
  };
}