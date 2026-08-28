import { RuntimeStateManager } from "./runtime-state";

export class RuntimeLifecycle {
  private readonly state: RuntimeStateManager;

  constructor(state: RuntimeStateManager) {
    this.state = state;
  }

  canInitialize(): boolean {
    return this.state.is("created");
  }

  canStart(): boolean {
    return this.state.is("initialized") || this.state.is("stopped");
  }

  canStop(): boolean {
    return this.state.is("running");
  }

  canDestroy(): boolean {
    return !this.state.is("destroyed");
  }
}
