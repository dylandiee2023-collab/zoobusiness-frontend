import type { RuntimeService } from "./runtime-service";

export class RuntimeRegistry {
  private readonly services =
    new Map<
      string,
      RuntimeService
    >();

  register(
    service: RuntimeService,
  ): void {
    this.services.set(
      service.id,
      service,
    );
  }

  unregister(
    id: string,
  ): void {
    this.services.delete(id);
  }

  has(
    id: string,
  ): boolean {
    return this.services.has(id);
  }

  resolve(
    id: string,
  ): RuntimeService | undefined {
    return this.services.get(id);
  }

  values(): readonly RuntimeService[] {
    return [
      ...this.services.values(),
    ];
  }

  clear(): void {
    this.services.clear();
  }
}