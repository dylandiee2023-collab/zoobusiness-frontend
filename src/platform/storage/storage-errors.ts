export class StorageError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "StorageError";
  }
}

export class StorageKeyNotFoundError extends StorageError {
  constructor(key: string) {
    super(`Storage key "${key}" was not found.`);
  }
}
