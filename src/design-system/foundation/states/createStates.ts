import type { ComponentStates, StateStyle } from "./types";

export function createStates(states: ComponentStates) {
  return (state: keyof ComponentStates = "base"): StateStyle => {
    return states[state] ?? {};
  };
}
