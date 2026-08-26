import { BaseRegistry } from "../foundation/registry";

import type {
  FeedbackItem,
} from "./Feedback.types";

export class FeedbackRegistry
  extends BaseRegistry<
    string,
    FeedbackItem
  >
{
  register(
    item: FeedbackItem,
  ): void {
    this.set(item.id, item);
  }

  unregister(
    id: string,
  ): void {
    this.delete(id);
  }

  get(
    id: string,
  ): FeedbackItem | undefined {
    return this.getValue(id);
  }

  getAll(): FeedbackItem[] {
    return [...this.values()];
  }
}