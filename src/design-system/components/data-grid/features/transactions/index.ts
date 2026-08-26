export interface Transaction<
  T = unknown,
> {
  id: string;

  before: T;

  after: T;

  timestamp: Date;
}

export function createTransaction<
  T,
>(
  id: string,
  before: T,
  after: T,
): Transaction<T> {
  return {
    id,
    before,
    after,
    timestamp:
      new Date(),
  };
}