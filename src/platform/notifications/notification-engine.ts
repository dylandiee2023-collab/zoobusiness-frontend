import type {
  NotificationEngineContract,
  NotificationOptions,
} from "@/platform/contracts";

export class NotificationEngine
  implements NotificationEngineContract
{
  private readonly notifications:
    NotificationOptions[] = [];

  notify(
    options: NotificationOptions,
  ): void {
    this.notifications.push(
      options,
    );
  }

  clear(): void {
    this.notifications.length = 0;
  }
}