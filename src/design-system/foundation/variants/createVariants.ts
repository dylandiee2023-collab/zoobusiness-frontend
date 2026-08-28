import type { VariantOptions, VariantStyle } from "./types";

export function createVariants(options: VariantOptions) {
  return (variant?: string): VariantStyle => {
    const resolvedVariant = variant ?? options.defaultVariant;

    const style =
      options.variants[resolvedVariant] ??
      options.variants[options.defaultVariant];

    if (!style) {
      throw new Error(`Variant "${resolvedVariant}" was not found.`);
    }

    return style;
  };
}
