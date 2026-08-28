import type { LifecycleState } from "@/platform/types";

export class KernelLifecycle {
  canInitialize(state: LifecycleState): boolean {
    return state === "created";
  }

  canStart(state: LifecycleState): boolean {
    return state === "initialized" || state === "stopped";
  }

  canStop(state: LifecycleState): boolean {
    return state === "running";
  }

  canDestroy(state: LifecycleState): boolean {
    return state !== "destroyed";
  }
}
