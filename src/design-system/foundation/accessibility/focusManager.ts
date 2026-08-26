import type { FocusManager } from "./types";

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  return Array.from(
    container.querySelectorAll<HTMLElement>(selector),
  );
}

export const focusManager: FocusManager = {
  focusFirst(container) {
    const elements = getFocusableElements(container);

    elements[0]?.focus();
  },

  focusLast(container) {
    const elements = getFocusableElements(container);

    elements.at(-1)?.focus();
  },
};