export class KernelError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "KernelError";
  }
}

export class KernelInitializationError extends KernelError {
  constructor() {
    super("Kernel initialization failed.");
  }
}

export class KernelStartError extends KernelError {
  constructor() {
    super("Kernel start failed.");
  }
}

export class KernelStopError extends KernelError {
  constructor() {
    super("Kernel stop failed.");
  }
}

export class KernelDestroyedError extends KernelError {
  constructor() {
    super("Kernel has already been destroyed.");
  }
}

export class ServiceAlreadyRegisteredError extends KernelError {
  constructor(id: string) {
    super(
      `Service "${id}" is already registered.`,
    );
  }
}

export class ServiceNotFoundError extends KernelError {
  constructor(id: string) {
    super(
      `Service "${id}" was not found.`,
    );
  }
}