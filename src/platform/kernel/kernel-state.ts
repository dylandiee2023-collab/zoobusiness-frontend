import type { LifecycleState } from "@/platform/types";

export class KernelState {
  private _current: LifecycleState = "created";

  get current(): LifecycleState {
    return this._current;
  }

  is(state: LifecycleState): boolean {
    return this._current === state;
  }

  transition(state: LifecycleState): void {
    this._current = state;
  }

  reset(): void {
    this._current = "created";
  }
}