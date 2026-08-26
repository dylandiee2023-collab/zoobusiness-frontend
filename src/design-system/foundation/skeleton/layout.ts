import type { SkeletonState } from "./createSkeleton";

export function isCircle(
  skeleton: SkeletonState,
): boolean {
  return skeleton.variant === "circle";
}

export function isRectangle(
  skeleton: SkeletonState,
): boolean {
  return skeleton.variant === "rectangle";
}

export function isText(
  skeleton: SkeletonState,
): boolean {
  return skeleton.variant === "text";
}