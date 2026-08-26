export class NotificationEngineError
  extends Error
{
  constructor(
    message: string,
  ) {
    super(message);

    this.name =
      "NotificationEngineError";
  }
}