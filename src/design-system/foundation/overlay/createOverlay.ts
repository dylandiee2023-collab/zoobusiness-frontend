import type { OverlayOptions } from "./types";

export interface OverlayState {
  isOpen: boolean;

  closeOnEscape: boolean;

  closeOnBackdrop: boolean;
}

export function createOverlay(options: OverlayOptions = {}): OverlayState {
  return {
    isOpen: options.open ?? false,

    closeOnEscape: options.closeOnEscape ?? true,

    closeOnBackdrop: options.closeOnBackdrop ?? true,
  };
}
