export const OVERLAY_TRIGGER = {
  CLICK: "click",
  HOVER: "hover",
  FOCUS: "focus",
  CONTEXT_MENU: "context-menu",
  MANUAL: "manual",
} as const;

export type OverlayTriggerType =
  (typeof OVERLAY_TRIGGER)[keyof typeof OVERLAY_TRIGGER];

export interface OverlayTriggerOptions {
  type: OverlayTriggerType;
  disabled?: boolean;
  delay?: number;
}

export class OverlayTrigger {
  private readonly options: OverlayTriggerOptions;

  constructor(options: OverlayTriggerOptions) {
    this.options = options;
  }

  get type(): OverlayTriggerType {
    return this.options.type;
  }

  get disabled(): boolean {
    return this.options.disabled ?? false;
  }

  get delay(): number {
    return this.options.delay ?? 0;
  }

  is(type: OverlayTriggerType): boolean {
    return this.options.type === type;
  }
}
