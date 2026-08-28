export class CommandEngineError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "CommandEngineError";
  }
}
