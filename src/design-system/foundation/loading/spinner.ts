import type { LoadingState } from "./createLoading";

export function isSpinner(
  state: LoadingState,
): boolean {
  return state.variant === "spinner";
}