import type { KernelContract } from "@/platform/contracts";
import { KernelRegistry } from "./kernel-registry";
import { KernelLifecycle } from "./kernel-lifecycle";
import { KernelState } from "./kernel-state";
import { KernelPipeline } from "./kernel-pipeline";

export class Kernel implements KernelContract {
  private readonly _state =
    new KernelState();

  private readonly _lifecycle =
    new KernelLifecycle();

  private readonly registry =
    new KernelRegistry();

    private readonly pipeline =
  new KernelPipeline(this);

  readonly version = "1.0.0";

  get state() {
    return this._state.current;
  }

  get initialized() {
    return (
      this.state !== "created" &&
      this.state !== "destroyed"
    );
  }

  get running() {
    return this.state === "running";
  }

  async initialize(): Promise<void> {
    if (
      !this._lifecycle.canInitialize(
        this.state,
      )
    ) {
      return;
    }

    this._state.transition(
      "initializing",
    );

    this._state.transition(
      "initialized",
    );
  }

  async start(): Promise<void> {
    if (
      !this._lifecycle.canStart(
        this.state,
      )
    ) {
      return;
    }

    this._state.transition(
      "starting",
    );

    this._state.transition(
      "running",
    );
  }

  async stop(): Promise<void> {
    if (
      !this._lifecycle.canStop(
        this.state,
      )
    ) {
      return;
    }

    this._state.transition(
      "stopping",
    );

    this._state.transition(
      "stopped",
    );
  }

  async destroy(): Promise<void> {
    if (
      !this._lifecycle.canDestroy(
        this.state,
      )
    ) {
      return;
    }

    this._state.transition(
      "destroyed",
    );
  }

  async restart(): Promise<void> {
  await this.pipeline.restart();
}

async boot(): Promise<void> {
  await this.pipeline.start();
}

async shutdown(): Promise<void> {
  await this.pipeline.destroy();
}

register(
  service: {
    readonly id: string;
  },
): void {
  this.registry.register(
    service,
  );
}

unregister(
  id: string,
): void {
  this.registry.unregister(id);
}

has(
  id: string,
): boolean {
  return this.registry.has(id);
}

resolve<T extends {
  readonly id: string;
}>(
  id: string,
): T | undefined {
  return this.registry.resolve<T>(
    id,
  );
}

services() {
  return this.registry.values();
}

}
