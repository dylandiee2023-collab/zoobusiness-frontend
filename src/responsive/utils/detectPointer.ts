import type { PointerType } from "../types/responsive.types";

export function detectPointer(): PointerType {
  if (window.matchMedia("(pointer:fine)").matches) return "fine";
  if (window.matchMedia("(pointer:coarse)").matches) return "coarse";
  return "none";
}