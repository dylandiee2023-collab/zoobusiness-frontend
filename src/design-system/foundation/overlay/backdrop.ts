import type { OverlayState } from "./createOverlay";

export function canCloseOnBackdrop(overlay: OverlayState): boolean {
  return overlay.closeOnBackdrop;
}
