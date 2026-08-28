export type NotificationType = "success" | "info" | "warning" | "error";

export interface NotificationOptions {
  title?: string;

  message: string;

  type: NotificationType;

  duration?: number;
}

export interface NotificationEngineContract {
  notify(options: NotificationOptions): void;

  clear(): void;
}
