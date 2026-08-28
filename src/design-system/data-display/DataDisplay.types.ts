export interface DataDisplayItem {
  id: string;
  type: string;
}

export interface DataDisplayManager {
  enable(): void;
  disable(): void;
  destroy(): void;
  isEnabled(): boolean;
}
