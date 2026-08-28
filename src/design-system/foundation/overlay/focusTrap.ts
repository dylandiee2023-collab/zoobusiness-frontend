import type { OverlayState } from "./createOverlay";

export function canCloseOnEscape(overlay: OverlayState): boolean {
  return overlay.closeOnEscape;
}
