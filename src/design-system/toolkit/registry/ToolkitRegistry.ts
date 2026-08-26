import type {
  Toolkit,
  ToolkitComponent,
} from "../contracts";

export class ToolkitRegistry
  implements Toolkit
{
  private readonly registry =
    new Map<
      string,
      ToolkitComponent
    >();

  register(
    component: ToolkitComponent,
  ): void {
    this.registry.set(
      component.displayName,
      component,
    );
  }

  unregister(
    name: string,
  ): void {
    this.registry.delete(name);
  }

  has(
    name: string,
  ): boolean {
    return this.registry.has(name);
  }

  get(
    name: string,
  ): ToolkitComponent | undefined {
    return this.registry.get(name);
  }

  getAll(): ToolkitComponent[] {
    return [
      ...this.registry.values(),
    ];
  }
}