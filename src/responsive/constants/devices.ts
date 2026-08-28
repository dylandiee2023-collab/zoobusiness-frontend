import type { DeviceType } from "../types/responsive.types";

export const DEVICES: readonly DeviceType[] = [
  "mobile",
  "tablet",
  "laptop",
  "desktop",
  "wide",
] as const;
