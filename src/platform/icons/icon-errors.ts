export class IconEngineError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "IconEngineError";
  }
}

export class IconNotFoundError extends IconEngineError {
  constructor(id: string) {
    super(`Icon "${id}" was not found.`);
  }
}
