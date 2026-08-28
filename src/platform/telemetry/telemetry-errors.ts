export class TelemetryError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "TelemetryError";
  }
}
