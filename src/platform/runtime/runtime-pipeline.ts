import type { RuntimeService } from "./runtime-service";

export class RuntimePipeline {
  async initialize(services: readonly RuntimeService[]): Promise<void> {
    const ordered = [...services].sort((a, b) => a.priority - b.priority);

    for (const service of ordered) {
      await service.initialize();
    }
  }

  async start(services: readonly RuntimeService[]): Promise<void> {
    const ordered = [...services].sort((a, b) => a.priority - b.priority);

    for (const service of ordered) {
      await service.start();
    }
  }

  async stop(services: readonly RuntimeService[]): Promise<void> {
    const ordered = [...services]
      .sort((a, b) => a.priority - b.priority)
      .reverse();

    for (const service of ordered) {
      await service.stop();
    }
  }

  async destroy(services: readonly RuntimeService[]): Promise<void> {
    const ordered = [...services]
      .sort((a, b) => a.priority - b.priority)
      .reverse();

    for (const service of ordered) {
      await service.destroy();
    }
  }
}
