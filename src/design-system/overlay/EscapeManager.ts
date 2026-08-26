import { OverlayController } from "./OverlayController";

export class EscapeManager {
  private readonly controller: OverlayController;

  constructor(
    controller: OverlayController,
  ) {
    this.controller = controller;
  }

  handle(
    event: KeyboardEvent,
  ): void {
    if (event.key !== "Escape") {
      return;
    }

    this.controller.closeTop();
  }

  attach(): void {
    document.addEventListener(
      "keydown",
      this.handle,
    );
  }

  detach(): void {
    document.removeEventListener(
      "keydown",
      this.handle,
    );
  }
}