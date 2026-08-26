import type {
  OverlayPlacement,
  OverlayType,
} from "./overlay.enums";

export interface OverlayOptions {
  id: string;

  type: OverlayType;

  placement?: OverlayPlacement;

  modal?: boolean;

  dismissOnEscape?: boolean;

  dismissOnOutsideClick?: boolean;

  closeOnScroll?: boolean;

  closeOnResize?: boolean;

  disabled?: boolean;

  zIndex?: number;
}

export interface OverlayInstance
  extends OverlayOptions {
  open: boolean;

  trigger: HTMLElement | null;

  content: HTMLElement | null;
}