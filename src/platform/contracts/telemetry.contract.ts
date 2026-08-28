export interface TelemetryContract {
  track(event: string, properties?: Record<string, unknown>): void;

  error(error: Error, context?: Record<string, unknown>): void;
}
