import { DEFAULT_LAYOUT } from "../constants/layout.constants";
import type {
  LayoutDimensions,
  LayoutState,
  LayoutType,
} from "../types/layout.types";

export class LayoutService {
  static create(layout: LayoutType): LayoutState {
    const dimensions = this.resolveDimensions(layout);

    return {
      layout,
      dimensions,

      hasSidebar: layout === "dashboard" || layout === "marketplace",

      hasTopbar: layout !== "blank" && layout !== "error",

      hasFooter: layout === "public" || layout === "auth",

      fullScreen: layout === "pos",

      centered: layout === "auth",
    };
  }

  private static resolveDimensions(layout: LayoutType): LayoutDimensions {
    switch (layout) {
      case "pos":
        return {
          ...DEFAULT_LAYOUT,
          sidebarWidth: 0,
          contentPadding: 0,
        };

      case "auth":
        return {
          ...DEFAULT_LAYOUT,
          sidebarWidth: 0,
          maxContentWidth: 480,
        };

      case "public":
        return {
          ...DEFAULT_LAYOUT,
          maxContentWidth: 1280,
        };

      default:
        return DEFAULT_LAYOUT;
    }
  }
}
