import type { OverlayItem } from "./Overlay.types";
import { OverlayStack } from "./OverlayStack";

export class OverlayController {
  private readonly stack: OverlayStack;

  constructor(stack: OverlayStack) {
    this.stack = stack;
  }

  register(overlay: OverlayItem): void {
    this.stack.push(overlay);
  }

  unregister(id: string): void {
    this.stack.remove(id);
  }

  closeTop(): void {
    this.stack.top()?.close();
  }

  closeAll(): void {
    this.stack
      .all()
      .slice()
      .reverse()
      .forEach((overlay) => overlay.close());
  }

  isOpen(id: string): boolean {
    return this.stack
      .all()
      .some(
        (overlay) =>
          overlay.id === id &&
          overlay.open,
      );
  }

  getStack(): readonly OverlayItem[] {
    return this.stack.all();
  }
}