import type { StyleObject } from "../contracts";

export interface CompoundVariant {
  when: Record<string, unknown>;
  styles: StyleObject;
}