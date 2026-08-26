export class ApiError extends Error {
  readonly status: number | undefined;

  constructor(
    message: string,
    status?: number,
  ) {
    super(message);

    this.name = "ApiError";

    this.status = status;
  }
}

export class UnauthorizedError extends ApiError {
  constructor() {
    super("Unauthorized", 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor() {
    super("Forbidden", 403);
  }
}

export class NotFoundError extends ApiError {
  constructor() {
    super("Not Found", 404);
  }
}

export class InternalServerError extends ApiError {
  constructor() {
    super("Internal Server Error", 500);
  }
}