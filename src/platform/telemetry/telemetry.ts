import type { TelemetryContract } from "@/platform/contracts";

export class Telemetry implements TelemetryContract {
  track(event: string, properties?: Record<string, unknown>): void {
    console.info("[Telemetry]", event, properties);
  }

  error(error: Error, context?: Record<string, unknown>): void {
    console.error("[Telemetry]", error, context);
  }
}
