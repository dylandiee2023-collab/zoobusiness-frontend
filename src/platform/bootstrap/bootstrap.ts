import type {
  BootstrapContract,
  KernelContract,
} from "@/platform/contracts";

import { BootstrapGuard } from "./bootstrap-guard";
import { BootstrapLifecycle } from "./bootstrap-lifecycle";
import { BootstrapPipeline } from "./bootstrap-pipeline";
import { BootstrapRegistry } from "./bootstrap-registry";
import { BootstrapStateManager } from "./bootstrap-state";

export class Bootstrap implements BootstrapContract {
  readonly kernel: KernelContract;

  private readonly state: BootstrapStateManager;

  private readonly lifecycle: BootstrapLifecycle;

  private readonly guard: BootstrapGuard;

  private readonly registry: BootstrapRegistry;

  private readonly pipeline: BootstrapPipeline;

  constructor(kernel: KernelContract) {
    this.kernel = kernel;

    this.state =
      new BootstrapStateManager();

    this.lifecycle =
      new BootstrapLifecycle(
        this.state,
      );

    this.guard =
      new BootstrapGuard(
        this.lifecycle,
      );

    this.registry =
      new BootstrapRegistry();

    this.pipeline =
      new BootstrapPipeline();
  }

  get bootstrapped(): boolean {
    return this.state.is(
      "bootstrapped",
    );
  }

  async initialize(): Promise<void> {
    this.guard.initialize();

    this.state.transition(
      "bootstrapping",
    );

    await this.kernel.initialize();

    this.state.transition(
      "bootstrapped",
    );
  }

  async bootstrap(): Promise<void> {
    await this.initialize();

    await this.pipeline.execute(
      this.registry.values(),
    );
  }

  async start(): Promise<void> {
    this.guard.start();

    await this.bootstrap();

    this.state.transition(
      "running",
    );

    await this.kernel.start();
  }

  async stop(): Promise<void> {
    if (
      !this.lifecycle.canStop()
    ) {
      return;
    }

    this.state.transition(
      "stopping",
    );

    await this.kernel.stop();

    this.state.transition(
      "stopped",
    );
  }

  async destroy(): Promise<void> {
    this.guard.destroy();

    this.registry.clear();

    this.state.reset();

    await this.kernel.destroy();
  }
}