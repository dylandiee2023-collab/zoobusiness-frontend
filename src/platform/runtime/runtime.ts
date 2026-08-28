import type { BootstrapContract, RuntimeContract } from "@/platform/contracts";

import { RuntimeLifecycle } from "./runtime-lifecycle";
import { RuntimePipeline } from "./runtime-pipeline";
import { RuntimeRegistry } from "./runtime-registry";
import { RuntimeStateManager } from "./runtime-state";

export class Runtime implements RuntimeContract {
  readonly bootstrap: BootstrapContract;

  private readonly stateManager: RuntimeStateManager;

  private readonly lifecycle: RuntimeLifecycle;

  private readonly registry: RuntimeRegistry;

  private readonly pipeline: RuntimePipeline;

  constructor(bootstrap: BootstrapContract) {
    this.bootstrap = bootstrap;

    this.stateManager = new RuntimeStateManager();

    this.lifecycle = new RuntimeLifecycle(this.stateManager);

    this.registry = new RuntimeRegistry();

    this.pipeline = new RuntimePipeline();
  }

  get state() {
    return this.stateManager.current();
  }

  get ready(): boolean {
    return this.stateManager.is("running");
  }

  async initialize(): Promise<void> {
    if (!this.lifecycle.canInitialize()) {
      return;
    }

    this.stateManager.transition("initializing");

    await this.bootstrap.initialize();

    await this.pipeline.initialize(this.registry.values());

    this.stateManager.transition("initialized");
  }

  async start(): Promise<void> {
    if (!this.lifecycle.canStart()) {
      return;
    }

    await this.initialize();

    this.stateManager.transition("starting");

    await this.bootstrap.start();

    await this.pipeline.start(this.registry.values());

    this.stateManager.transition("running");
  }

  async stop(): Promise<void> {
    if (!this.lifecycle.canStop()) {
      return;
    }

    this.stateManager.transition("stopping");

    await this.pipeline.stop(this.registry.values());

    await this.bootstrap.stop();

    this.stateManager.transition("stopped");
  }

  async destroy(): Promise<void> {
    await this.pipeline.destroy(this.registry.values());

    this.registry.clear();

    await this.bootstrap.destroy();

    this.stateManager.transition("destroyed");
  }
}
