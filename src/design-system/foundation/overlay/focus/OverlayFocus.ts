export interface OverlayFocusOptions {
  autoFocus?: boolean;
  restoreFocus?: boolean;
  trapFocus?: boolean;
}

export class OverlayFocus {
  private readonly options: OverlayFocusOptions;

  constructor(
    options: OverlayFocusOptions = {},
  ) {
    this.options = options;
  }

  focus(
    element: HTMLElement | null,
  ): void {
    if (!this.options.autoFocus) {
      return;
    }

    element?.focus();
  }

  restore(
    element: HTMLElement | null,
  ): void {
    if (!this.options.restoreFocus) {
      return;
    }

    element?.focus();
  }

  trap(
    event: KeyboardEvent,
    first: HTMLElement | null,
    last: HTMLElement | null,
  ): void {
    if (
      !this.options.trapFocus ||
      event.key !== "Tab" ||
      !first ||
      !last
    ) {
      return;
    }

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }
}