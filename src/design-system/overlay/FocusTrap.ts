export class FocusTrap {
  private previousFocus: HTMLElement | null = null;

  activate(): void {
    this.previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
  }

  deactivate(): void {
    this.previousFocus?.focus();

    this.previousFocus = null;
  }

  trap(container: HTMLElement): void {
    const focusable = container.querySelectorAll<HTMLElement>(
      [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        "[tabindex]:not([tabindex='-1'])",
      ].join(","),
    );

    if (focusable.length === 0) {
      container.focus();
      return;
    }

    const first = focusable.item(0);

    if (!first) {
      container.focus();
      return;
    }

    first.focus();
  }
}
