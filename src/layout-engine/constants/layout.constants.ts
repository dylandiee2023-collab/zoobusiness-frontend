import type { LayoutDimensions } from "../types/layout.types";

export const DEFAULT_LAYOUT: LayoutDimensions = {
  sidebarWidth: 280,

  topbarHeight: 72,

  footerHeight: 48,

  maxContentWidth: 1600,

  contentPadding: 24,

  gridColumns: 12,
} as const;
