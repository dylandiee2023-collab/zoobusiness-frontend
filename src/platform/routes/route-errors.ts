export class RouteError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "RouteError";
  }
}

export class RouteNotFoundError extends RouteError {
  constructor(path: string) {
    super(
      `Route "${path}" was not found.`,
    );
  }
}