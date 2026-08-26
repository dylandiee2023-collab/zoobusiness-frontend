export interface OverlayDismissOptions {
  escapeKey?: boolean;
  outsideClick?: boolean;
  blur?: boolean;
}

export class OverlayDismiss {
  private readonly options: OverlayDismissOptions;

  constructor(
    options: OverlayDismissOptions = {},
  ) {
    this.options = options;
  }

  shouldDismissOnEscape(
    event: KeyboardEvent,
  ): boolean {
    return (
      this.options.escapeKey !== false &&
      event.key === "Escape"
    );
  }

  shouldDismissOnOutsideClick(
    event: MouseEvent,
    content: HTMLElement | null,
  ): boolean {
    if (
      !this.options.outsideClick ||
      !content
    ) {
      return false;
    }

    return !content.contains(
      event.target as Node,
    );
  }

  shouldDismissOnBlur(): boolean {
    return this.options.blur ?? false;
  }
}