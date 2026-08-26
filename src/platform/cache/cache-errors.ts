export class CacheError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "CacheError";
  }
}

export class CacheKeyNotFoundError extends CacheError {
  constructor(key: string) {
    super(
      `Cache key "${key}" not found.`,
    );
  }
}