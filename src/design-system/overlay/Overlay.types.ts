export type OverlayType =
  | "dialog"
  | "drawer"
  | "popover"
  | "tooltip"
  | "toast";

export interface OverlayItem {
  id: string;

  type: OverlayType;

  open: boolean;

  close: () => void;
}

export interface OverlayContextValue {
  stack: OverlayItem[];

  register: (overlay: OverlayItem) => void;

  unregister: (id: string) => void;

  closeTop: () => void;
}