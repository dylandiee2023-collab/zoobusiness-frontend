export interface FeedbackItem {
  id: string;
  type: string;
}

export interface FeedbackManager {
  enable(): void;
  disable(): void;
  destroy(): void;
  isEnabled(): boolean;
}
