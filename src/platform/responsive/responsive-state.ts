import { Breakpoints, type Breakpoint } from "./responsive-breakpoints";

export class ResponsiveState {
  private width = window.innerWidth;

  get current(): Breakpoint {
    if (this.width >= Breakpoints.wide) {
      return "wide";
    }

    if (this.width >= Breakpoints.desktop) {
      return "desktop";
    }

    if (this.width >= Breakpoints.laptop) {
      return "laptop";
    }

    if (this.width >= Breakpoints.tablet) {
      return "tablet";
    }

    return "mobile";
  }

  setWidth(width: number): void {
    this.width = width;
  }
}
