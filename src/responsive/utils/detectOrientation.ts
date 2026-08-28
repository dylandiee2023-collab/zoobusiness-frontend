import type { Orientation } from "../types/responsive.types";

export function detectOrientation(): Orientation {
  return window.innerWidth >= window.innerHeight ? "landscape" : "portrait";
}
