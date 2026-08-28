import {
  BootstrapDestroyedError,
  BootstrapInitializationError,
  BootstrapStartError,
} from "./bootstrap-errors";

import { BootstrapLifecycle } from "./bootstrap-lifecycle";

export class BootstrapGuard {
  private readonly lifecycle: BootstrapLifecycle;

  constructor(lifecycle: BootstrapLifecycle) {
    this.lifecycle = lifecycle;
  }

  initialize(): void {
    if (!this.lifecycle.canInitialize()) {
      throw new BootstrapInitializationError();
    }
  }

  start(): void {
    if (!this.lifecycle.canStart()) {
      throw new BootstrapStartError();
    }
  }

  destroy(): void {
    if (!this.lifecycle.canDestroy()) {
      throw new BootstrapDestroyedError();
    }
  }
}
