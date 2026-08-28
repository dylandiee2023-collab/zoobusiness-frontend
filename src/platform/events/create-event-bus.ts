import { EventBus } from "./event-bus";

export function createEventBus(): EventBus {
  return new EventBus();
}
