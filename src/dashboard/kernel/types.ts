export interface DashboardKernel {
  boot(): void;

  shutdown(): void;

  isRunning(): boolean;
}
