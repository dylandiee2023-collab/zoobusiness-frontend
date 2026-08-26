import {
  ServiceAlreadyRegisteredError,
  ServiceNotFoundError,
} from "./kernel-errors";



export interface KernelService {
  readonly id: string;
}

export class KernelRegistry {
  private readonly services = new Map<
    string,
    KernelService
  >();

  register(
  service: KernelService,
): void {

  if (this.has(service.id)) {
    throw new ServiceAlreadyRegisteredError(
      service.id,
    );
  }

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
resolve<T extends KernelService>(
  id: string,
): T {

  const service =
    this.services.get(id);

  if (!service) {
    throw new ServiceNotFoundError(
      id,
    );
  }

  return service as T;
}

  clear(): void {
    this.services.clear();
  }

  values(): readonly KernelService[] {
    return [
      ...this.services.values(),
    ];
  }
}