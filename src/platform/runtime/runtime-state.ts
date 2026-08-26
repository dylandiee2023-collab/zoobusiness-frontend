export type RuntimeState =
  | "created"
  | "initializing"
  | "initialized"
  | "starting"
  | "running"
  | "stopping"
  | "stopped"
  | "destroyed";

export class RuntimeStateManager {
  private state: RuntimeState = "created";

  current(): RuntimeState {
    return this.state;
  }

  is(state: RuntimeState): boolean {
    return this.state === state;
  }

  transition(state: RuntimeState): void {
    this.state = state;
  }

  reset(): void {
    this.state = "created";
  }
}