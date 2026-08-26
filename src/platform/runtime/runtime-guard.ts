import {
  RuntimeDestroyedError,
  RuntimeInitializationError,
  RuntimeStartError,
} from "./runtime-errors";

import { RuntimeLifecycle } from "./runtime-lifecycle";

export class RuntimeGuard {
  private readonly lifecycle: RuntimeLifecycle;

  constructor(lifecycle: RuntimeLifecycle) {
    this.lifecycle = lifecycle;
  }

  initialize(): void {
    if (!this.lifecycle.canInitialize()) {
      throw new RuntimeInitializationError();
    }
  }

  start(): void {
    if (!this.lifecycle.canStart()) {
      throw new RuntimeStartError();
    }
  }

  destroy(): void {
    if (!this.lifecycle.canDestroy()) {
      throw new RuntimeDestroyedError();
    }
  }
}