import type {
  HTMLAttributes,
} from "react";

export interface SkeletonProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children"
  > {
  width?: string;

  height?: string;

  rounded?: "none" | "sm" | "md" | "lg" | "full";

  animated?: boolean;
}