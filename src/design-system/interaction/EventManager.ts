import { BaseManager } from "../foundation/managers";

import type {
  InteractionHandler,
  InteractionManager,
} from "./Interaction.types";

export class EventManager extends BaseManager implements InteractionManager {
  dispatch<TEvent extends Event>(
    event: TEvent,
    handler: InteractionHandler<TEvent>,
  ): void {
    if (!this.isEnabled()) {
      return;
    }

    handler(event);
  }
}
