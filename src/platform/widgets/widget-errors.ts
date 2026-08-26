export class WidgetEngineError
  extends Error
{
  constructor(
    message: string,
  ) {
    super(message);

    this.name =
      "WidgetEngineError";
  }
}