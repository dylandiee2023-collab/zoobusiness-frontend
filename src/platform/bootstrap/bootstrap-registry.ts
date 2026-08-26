import type { BootstrapTask } from "./bootstrap-task";

export class BootstrapRegistry {
  private readonly tasks =
    new Map<
      string,
      BootstrapTask
    >();

  register(
    task: BootstrapTask,
  ): void {
    this.tasks.set(
      task.id,
      task,
    );
  }

  unregister(
    id: string,
  ): void {
    this.tasks.delete(id);
  }

  has(
    id: string,
  ): boolean {
    return this.tasks.has(id);
  }

  resolve(
    id: string,
  ): BootstrapTask | undefined {
    return this.tasks.get(id);
  }

  values(): readonly BootstrapTask[] {
    return [
      ...this.tasks.values(),
    ];
  }

  clear(): void {
    this.tasks.clear();
  }
}