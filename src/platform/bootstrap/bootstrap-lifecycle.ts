import { BootstrapStateManager } from "./bootstrap-state";

export class BootstrapLifecycle {
  private readonly state: BootstrapStateManager;

  constructor(state: BootstrapStateManager) {
    this.state = state;
  }

  canInitialize(): boolean {
    return this.state.is("created");
  }

  canBootstrap(): boolean {
    return this.state.is("bootstrapped");
  }

  canStart(): boolean {
    return this.state.is("bootstrapped") || this.state.is("stopped");
  }

  canStop(): boolean {
    return this.state.is("running");
  }

  canDestroy(): boolean {
    return !this.state.is("destroyed");
  }
}
