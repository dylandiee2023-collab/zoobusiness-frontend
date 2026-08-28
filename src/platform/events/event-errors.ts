export class EventBusError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "EventBusError";
  }
}

export class EventNotFoundError extends EventBusError {
  constructor(event: string) {
    super(`Event "${event}" does not exist.`);
  }
}
