export interface NavigationItem {
  id: string;
  path: string;
}

export interface NavigationManager {
  enable(): void;
  disable(): void;
  destroy(): void;
  isEnabled(): boolean;
}