import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

export class RouteLoader {
  static load(
    loader: () => Promise<{ default: ComponentType }>,
  ): LazyExoticComponent<ComponentType> {
    return lazy(loader);
  }
}
