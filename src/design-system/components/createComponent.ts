import type { ComponentType } from "react";

import type { ToolkitComponent } from "../toolkit/contracts";

export interface CreateComponentOptions<TProps = unknown> {
  displayName: string;

  Component: ComponentType<TProps>;
}

export function createComponent<TProps = unknown>(
  options: CreateComponentOptions<TProps>,
): ToolkitComponent<TProps> {
  const component: ToolkitComponent<TProps> = {
    displayName: options.displayName,
    Component: options.Component,
  };

  return Object.freeze(component);
}
