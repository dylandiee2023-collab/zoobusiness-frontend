import type { ComponentType } from "react";

import type { CreateComponentOptions } from "./types";

export function createComponent<Props>(
  options: CreateComponentOptions<Props>,
): ComponentType<Props> {
  const Component = options.render;

  Component.displayName = options.displayName;

  return Component;
}
