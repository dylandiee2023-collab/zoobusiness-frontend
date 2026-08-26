import type {
  SlotMap,
  SlotStyle,
} from "./types";

export function createSlots(
  slots: SlotMap,
) {
  return (
    slot: keyof typeof slots,
  ): SlotStyle => {
    return slots[slot] ?? {};
  };
}