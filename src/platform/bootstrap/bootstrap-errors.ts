export class BootstrapError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "BootstrapError";
  }
}

export class BootstrapInitializationError extends BootstrapError {
  constructor() {
    super("Bootstrap initialization failed.");
  }
}

export class BootstrapStartError extends BootstrapError {
  constructor() {
    super("Bootstrap start failed.");
  }
}

export class BootstrapStopError extends BootstrapError {
  constructor() {
    super("Bootstrap stop failed.");
  }
}

export class BootstrapDestroyedError extends BootstrapError {
  constructor() {
    super("Bootstrap has already been destroyed.");
  }
}