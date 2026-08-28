export abstract class BaseController<
  TRegistry extends {
    clear(): void;
  },
> {
  protected readonly registry: TRegistry;

  protected constructor(registry: TRegistry) {
    this.registry = registry;
  }

  getRegistry(): TRegistry {
    return this.registry;
  }

  destroy(): void {
    this.registry.clear();
  }
}
