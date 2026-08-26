export class LayoutEngineError
  extends Error
{
  constructor(
    message: string,
  ) {
    super(message);

    this.name =
      "LayoutEngineError";
  }
}