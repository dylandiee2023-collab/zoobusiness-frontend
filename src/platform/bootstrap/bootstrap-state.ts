export type BootstrapState =
  | "created"
  | "bootstrapping"
  | "bootstrapped"
  | "starting"
  | "running"
  | "stopping"
  | "stopped"
  | "destroyed";

export class BootstrapStateManager {
  private state: BootstrapState = "created";

  current(): BootstrapState {
    return this.state;
  }

  is(state: BootstrapState): boolean {
    return this.state === state;
  }

  transition(state: BootstrapState): void {
    this.state = state;
  }

  reset(): void {
    this.state = "created";
  }
}
