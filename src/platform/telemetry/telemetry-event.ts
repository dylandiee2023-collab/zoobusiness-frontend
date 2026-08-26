export interface TelemetryEvent {
  readonly name: string;

  readonly timestamp: number;

  readonly properties?: Record<
    string,
    unknown
  >;
}