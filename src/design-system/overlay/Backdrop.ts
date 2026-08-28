export class Backdrop {
  private readonly element: HTMLDivElement;

  constructor() {
    this.element = document.createElement("div");

    this.element.setAttribute("data-overlay-backdrop", "");

    Object.assign(this.element.style, {
      position: "fixed",
      inset: "0",
      background: "rgba(0, 0, 0, 0.5)",
      zIndex: "1000",
    });
  }

  show(): void {
    if (!document.body.contains(this.element)) {
      document.body.appendChild(this.element);
    }
  }

  hide(): void {
    if (document.body.contains(this.element)) {
      document.body.removeChild(this.element);
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}
