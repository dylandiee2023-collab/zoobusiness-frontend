import { BREAKPOINTS } from "../constants/breakpoints";
import type { DeviceType } from "../types/responsive.types";

export function detectDevice(width: number): DeviceType {
  if (width >= BREAKPOINTS.wide) return "wide";
  if (width >= BREAKPOINTS.desktop) return "desktop";
  if (width >= BREAKPOINTS.laptop) return "laptop";
  if (width >= BREAKPOINTS.tablet) return "tablet";
  return "mobile";
}
