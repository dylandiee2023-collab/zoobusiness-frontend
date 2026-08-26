export type LayoutType =
  | "dashboard"
  | "auth"
  | "marketplace"
  | "pos"
  | "public"
  | "blank"
  | "error";

export interface LayoutDimensions {
  sidebarWidth: number;
  topbarHeight: number;
  footerHeight: number;

  maxContentWidth: number;

  contentPadding: number;

  gridColumns: number;
}

export interface LayoutState {
  layout: LayoutType;

  dimensions: LayoutDimensions;

  hasSidebar: boolean;
  hasTopbar: boolean;
  hasFooter: boolean;

  fullScreen: boolean;

  centered: boolean;
}