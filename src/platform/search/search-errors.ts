export class SearchEngineError
  extends Error
{
  constructor(
    message: string,
  ) {
    super(message);

    this.name =
      "SearchEngineError";
  }
}