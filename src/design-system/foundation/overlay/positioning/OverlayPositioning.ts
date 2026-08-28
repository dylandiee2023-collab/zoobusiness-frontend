import type { OverlayPlacement } from "../contracts";

export interface Position {
  x: number;
  y: number;
}

export interface PositioningOptions {
  trigger: HTMLElement;
  content: HTMLElement;
  placement: OverlayPlacement;
  offset?: number;
}

export class OverlayPositioning {
  calculate({
    trigger,
    content,
    placement,
    offset = 8,
  }: PositioningOptions): Position {
    const triggerRect = trigger.getBoundingClientRect();

    const contentRect = content.getBoundingClientRect();

    switch (placement) {
      case "top":
        return {
          x: triggerRect.left + triggerRect.width / 2 - contentRect.width / 2,

          y: triggerRect.top - contentRect.height - offset,
        };

      case "bottom":
        return {
          x: triggerRect.left + triggerRect.width / 2 - contentRect.width / 2,

          y: triggerRect.bottom + offset,
        };

      case "left":
        return {
          x: triggerRect.left - contentRect.width - offset,

          y: triggerRect.top + triggerRect.height / 2 - contentRect.height / 2,
        };

      case "right":
        return {
          x: triggerRect.right + offset,

          y: triggerRect.top + triggerRect.height / 2 - contentRect.height / 2,
        };

      default:
        return {
          x: triggerRect.left,
          y: triggerRect.bottom + offset,
        };
    }
  }
}
