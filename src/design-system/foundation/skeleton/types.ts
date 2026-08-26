export type SkeletonVariant =
  | "text"
  | "circle"
  | "rectangle";

export type SkeletonSize =
  | "sm"
  | "md"
  | "lg";

export interface SkeletonOptions {
  variant?: SkeletonVariant;

  size?: SkeletonSize;

  animated?: boolean;
}