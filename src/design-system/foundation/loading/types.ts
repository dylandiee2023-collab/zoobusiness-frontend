export type LoadingVariant =
  | "spinner"
  | "progress";

export type LoadingSize =
  | "sm"
  | "md"
  | "lg";

export interface LoadingOptions {
  loading?: boolean;

  variant?: LoadingVariant;

  size?: LoadingSize;

  delay?: number;
}