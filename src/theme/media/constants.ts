import type {
  Breakpoint,
} from "./types";

export const breakpointOrder = [
  "mobile",
  "mobileLg",
  "tablet",
  "laptop",
  "desktop",
  "wide",
] as const satisfies readonly Breakpoint[];