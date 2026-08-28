export interface DashboardManager {
  start(): void;

  stop(): void;

  restart(): void;

  isActive(): boolean;
}
