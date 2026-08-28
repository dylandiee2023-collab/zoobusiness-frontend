import type { Viewport } from "../types/responsive.types";

export function detectViewport(): Viewport {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
