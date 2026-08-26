export class HttpError extends Error {
  readonly status: number | undefined;

  constructor(
    message: string,
    status?: number,
  ) {
    super(message);

    this.name = "HttpError";

    this.status = status;
  }
}