import type { ComponentType } from "react";

export interface ToolkitComponent<TProps = unknown> {
  readonly displayName: string;

  readonly Component: ComponentType<TProps>;
}

export interface Toolkit {
  register(component: ToolkitComponent): void;

  unregister(name: string): void;

  has(name: string): boolean;

  get(name: string): ToolkitComponent | undefined;

  getAll(): ToolkitComponent[];
}
