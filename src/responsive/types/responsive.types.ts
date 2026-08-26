export type DeviceType =
  | "mobile"
  | "tablet"
  | "laptop"
  | "desktop"
  | "wide";

export type Orientation = "portrait" | "landscape";

export type PointerType = "fine" | "coarse" | "none";

export interface Viewport {
  width: number;
  height: number;
}

export interface ResponsiveState extends Viewport {
  device: DeviceType;
  breakpoint: DeviceType;
  orientation: Orientation;

  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isWide: boolean;

  isTouch: boolean;
  hasHover: boolean;
  pointer: PointerType;

  pixelRatio: number;
  reducedMotion: boolean;
}