import * as React from "react";

const ACTIVATION_KEYS = new Set(["Enter", " "]);

export function isActivationKey(key: string): boolean {
  return ACTIVATION_KEYS.has(key);
}

export function isEscapeKey(key: string): boolean {
  return key === "Escape";
}

export function isTabKey(key: string): boolean {
  return key === "Tab";
}

export function preventKeyboardScroll(event: React.KeyboardEvent): void {
  if (event.key === " ") {
    event.preventDefault();
  }
}
