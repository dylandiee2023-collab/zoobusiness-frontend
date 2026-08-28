export interface DashboardBootstrap {
  initialize(): void;

  destroy(): void;

  isInitialized(): boolean;
}
