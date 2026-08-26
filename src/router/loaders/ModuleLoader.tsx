import { lazy } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

export class ModuleLoader {
  static load(
    loader: () => Promise<{ default: ComponentType }>
  ): LazyExoticComponent<ComponentType> {
    return lazy(loader);
  }
}