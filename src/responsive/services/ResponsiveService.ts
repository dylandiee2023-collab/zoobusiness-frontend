import { detectDevice } from "../utils/detectDevice";
import { detectOrientation } from "../utils/detectOrientation";
import { detectPointer } from "../utils/detectPointer";
import { detectViewport } from "../utils/detectViewport";
import type { ResponsiveState } from "../types/responsive.types";

export class ResponsiveService {
  static getState(): ResponsiveState {
    const { width, height } = detectViewport();

    const device = detectDevice(width);
    const pointer = detectPointer();

    return {
      width,
      height,

      device,
      breakpoint: device,

      orientation: detectOrientation(),

      isMobile: device === "mobile",
      isTablet: device === "tablet",
      isLaptop: device === "laptop",
      isDesktop: device === "desktop",
      isWide: device === "wide",

      isTouch: navigator.maxTouchPoints > 0,
      hasHover: window.matchMedia("(hover:hover)").matches,

      pointer,

      pixelRatio: window.devicePixelRatio,

      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches,
    };
  }
}
