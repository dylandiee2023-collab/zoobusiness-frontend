export const OVERLAY_TYPE = {
  TOOLTIP: "tooltip",
  POPOVER: "popover",
  MODAL: "modal",
  DRAWER: "drawer",
  DROPDOWN: "dropdown",
  MENU: "menu",
  HOVER_CARD: "hover-card",
  CONTEXT_MENU: "context-menu",
} as const;

export type OverlayType =
  (typeof OVERLAY_TYPE)[keyof typeof OVERLAY_TYPE];

export const OVERLAY_PLACEMENT = {
  TOP: "top",
  TOP_START: "top-start",
  TOP_END: "top-end",

  RIGHT: "right",
  RIGHT_START: "right-start",
  RIGHT_END: "right-end",

  BOTTOM: "bottom",
  BOTTOM_START: "bottom-start",
  BOTTOM_END: "bottom-end",

  LEFT: "left",
  LEFT_START: "left-start",
  LEFT_END: "left-end",
} as const;

export type OverlayPlacement =
  (typeof OVERLAY_PLACEMENT)[keyof typeof OVERLAY_PLACEMENT];