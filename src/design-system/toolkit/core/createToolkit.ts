import type {
  Toolkit,
  ToolkitComponent,
} from "./types";

export function createToolkit(): Toolkit {
  const registry = new Map<
    string,
    ToolkitComponent<unknown>
  >();

  return {
    register<Props>(
      component: ToolkitComponent<Props>,
    ): void {
      registry.set(
        component.displayName,
        component as ToolkitComponent<unknown>,
      );
    },

    get<Props>(
      name: string,
    ): ToolkitComponent<Props> | undefined {
      return registry.get(name) as
        | ToolkitComponent<Props>
        | undefined;
    },

    has(
      name: string,
    ): boolean {
      return registry.has(name);
    },

    remove(
      name: string,
    ): void {
      registry.delete(name);
    },

    clear(): void {
      registry.clear();
    },
  };
}