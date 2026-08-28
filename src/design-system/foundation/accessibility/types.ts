export interface FocusRingOptions {
  inset?: boolean;
  offset?: number;
}

export interface AriaOptions {
  disabled?: boolean;
  busy?: boolean;
  invalid?: boolean;
  required?: boolean;
  expanded?: boolean;
  controls?: string;
  labelledBy?: string;
  describedBy?: string;
}

export interface FocusManager {
  focusFirst(container: HTMLElement): void;
  focusLast(container: HTMLElement): void;
}
