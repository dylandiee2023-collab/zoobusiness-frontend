import type { SkeletonOptions } from "./types";

export interface SkeletonState {
  variant: SkeletonVariant;

  size: SkeletonSize;

  animated: boolean;
}

import type {
  SkeletonSize,
  SkeletonVariant,
} from "./types";

export function createSkeleton(
  options: SkeletonOptions = {},
): SkeletonState {
  return {
    variant: options.variant ?? "text",

    size: options.size ?? "md",

    animated: options.animated ?? true,
  };
}