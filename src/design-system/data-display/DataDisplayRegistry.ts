import { BaseRegistry } from "../foundation/registry";

import type {
  DataDisplayItem,
} from "./DataDisplay.types";

export class DataDisplayRegistry
  extends BaseRegistry<
    string,
    DataDisplayItem
  >
{
  register(
    item: DataDisplayItem,
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
  ): DataDisplayItem | undefined {
    return this.getValue(id);
  }

  getAll(): DataDisplayItem[] {
    return [...this.values()];
  }
}