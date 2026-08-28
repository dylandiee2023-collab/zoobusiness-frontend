import type { InteractionManager } from "./Interaction.types";

import { InteractionRegistry } from "./InteractionRegistry";

export class InteractionController {
  private readonly registry: InteractionRegistry;

  constructor(registry: InteractionRegistry) {
    this.registry = registry;
  }

  register(id: string, manager: InteractionManager): void {
    this.registry.register(id, manager);
  }

  unregister(id: string): void {
    this.registry.unregister(id);
  }

  enable(id: string): void {
    this.registry.get(id)?.enable();
  }

  disable(id: string): void {
    this.registry.get(id)?.disable();
  }

  destroy(id: string): void {
    const manager = this.registry.get(id);

    if (!manager) {
      return;
    }

    manager.destroy();

    this.registry.unregister(id);
  }

  destroyAll(): void {
    this.registry.all().forEach((manager) => manager.destroy());

    this.registry.clear();
  }
}
