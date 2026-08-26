import type { BootstrapTask } from "./bootstrap-task";

export class BootstrapPipeline {
  async execute(
    tasks: readonly BootstrapTask[],
  ): Promise<void> {

    const ordered = [...tasks].sort(
      (a, b) =>
        a.priority - b.priority,
    );

    for (const task of ordered) {
      await task.run();
    }
  }
}