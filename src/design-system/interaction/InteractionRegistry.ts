import { BaseRegistry } from "../foundation/registry";

import type {
  InteractionManager,
} from "./Interaction.types";

export class InteractionRegistry
  extends BaseRegistry<
    string,
    InteractionManager
  >
{
  register(
    id: string,
    manager: InteractionManager,
  ): void {
    this.set(id, manager);
  }

  unregister(
    id: string,
  ): void {
    this.delete(id);
  }

  get(
    id: string,
  ): InteractionManager | undefined {
    return this.getValue(id);
  }

  has(
    id: string,
  ): boolean {
    return this.hasValue(id);
  }

  all(): readonly InteractionManager[] {
    return this.values();
  }
}