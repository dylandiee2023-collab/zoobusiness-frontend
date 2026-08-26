import type {
  LoadingOptions,
  LoadingSize,
} from "./types";

export interface LoadingState {
  isLoading: boolean;

  variant: "spinner" | "progress";

  size: LoadingSize;

  delay: number;
}

export function createLoading(
  options: LoadingOptions = {},
): LoadingState {
  return {
    isLoading: options.loading ?? false,

    variant: options.variant ?? "spinner",

    size: options.size ?? "md",

    delay: options.delay ?? 0,
  };
}