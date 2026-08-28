import type { KernelContract } from "@/platform/contracts";

export class KernelPipeline {
  private readonly kernel: KernelContract;

  constructor(kernel: KernelContract) {
    this.kernel = kernel;
  }

  async initialize(): Promise<void> {
    if (!this.kernel.initialized) {
      await this.kernel.initialize();
    }
  }

  async start(): Promise<void> {
    await this.initialize();

    if (!this.kernel.running) {
      await this.kernel.start();
    }
  }

  async stop(): Promise<void> {
    if (this.kernel.running) {
      await this.kernel.stop();
    }
  }

  async destroy(): Promise<void> {
    await this.stop();

    await this.kernel.destroy();
  }

  async restart(): Promise<void> {
    await this.stop();

    await this.start();
  }
}
