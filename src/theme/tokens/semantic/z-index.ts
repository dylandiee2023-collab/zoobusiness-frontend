import { zIndex } from "@/theme/tokens";

export const semanticZIndex = {
  dropdown: zIndex.dropdown,
  sticky: zIndex.sticky,
  drawer: zIndex.drawer,
  modal: zIndex.modal,
  tooltip: zIndex.tooltip,
  toast: zIndex.toast,
} as const;
