import type { SkeletonState } from "./createSkeleton";

export function isAnimated(
  skeleton: SkeletonState,
): boolean {
  return skeleton.animated;
}