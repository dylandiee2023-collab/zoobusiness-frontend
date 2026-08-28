/**
 * ============================================================
 * ZooBUSINESS Platform
 * Common Types
 * ============================================================
 */

export interface Disposable {
  destroy(): Promise<void>;
}

export interface Startable {
  start(): Promise<void>;
}

export interface Stoppable {
  stop(): Promise<void>;
}

export interface Initializable {
  initialize(): Promise<void>;
}
