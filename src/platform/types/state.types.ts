/**
 * ============================================================
 * ZooBUSINESS Platform
 * State Types
 * ============================================================
 */

export type PlatformState =
  | "idle"
  | "initializing"
  | "ready"
  | "running"
  | "paused"
  | "stopping"
  | "stopped"
  | "destroyed";

export interface State<T extends string = PlatformState> {
  readonly current: T;

  readonly previous?: T;
}