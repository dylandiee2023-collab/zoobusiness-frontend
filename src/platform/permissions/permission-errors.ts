export class PermissionError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "PermissionError";
  }
}

export class PermissionNotFoundError extends PermissionError {
  constructor(id: string) {
    super(`Permission "${id}" was not found.`);
  }
}
