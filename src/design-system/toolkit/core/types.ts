import type { ComponentType } from "react";

export interface ToolkitComponent<Props = unknown> {
  displayName: string;
  component: ComponentType<Props>;
}

export interface Toolkit {
  register<Props>(component: ToolkitComponent<Props>): void;

  get<Props>(name: string): ToolkitComponent<Props> | undefined;

  has(name: string): boolean;

  remove(name: string): void;

  clear(): void;
}
