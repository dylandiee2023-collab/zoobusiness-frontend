export class RuntimeError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "RuntimeError";
  }
}

export class RuntimeInitializationError extends RuntimeError {
  constructor() {
    super("Runtime initialization failed.");
  }
}

export class RuntimeStartError extends RuntimeError {
  constructor() {
    super("Runtime start failed.");
  }
}

export class RuntimeStopError extends RuntimeError {
  constructor() {
    super("Runtime stop failed.");
  }
}

export class RuntimeDestroyedError extends RuntimeError {
  constructor() {
    super("Runtime has already been destroyed.");
  }
}

export class RuntimeServiceAlreadyRegisteredError extends RuntimeError {
  constructor(id: string) {
    super(
      `Runtime service "${id}" is already registered.`,
    );
  }
}

export class RuntimeServiceNotFoundError extends RuntimeError {
  constructor(id: string) {
    super(
      `Runtime service "${id}" was not found.`,
    );
  }
}