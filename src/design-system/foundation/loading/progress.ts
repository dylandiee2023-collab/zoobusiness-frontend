import type { LoadingState } from "./createLoading";

export function isProgress(
  state: LoadingState,
): boolean {
  return state.variant === "progress";
}