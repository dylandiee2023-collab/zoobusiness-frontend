import type { TelemetryEvent } from "./telemetry-event";

export class TelemetryStore {
  private readonly events: TelemetryEvent[] = [];

  add(event: TelemetryEvent): void {
    this.events.push(event);
  }

  all(): readonly TelemetryEvent[] {
    return this.events;
  }

  clear(): void {
    this.events.length = 0;
  }
}
