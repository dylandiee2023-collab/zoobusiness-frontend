export interface SearchResult<T = unknown> {
  items: readonly T[];

  total: number;
}

export interface SearchEngineContract {
  search<T = unknown>(
    query: string,
  ): Promise<SearchResult<T>>;

  clear(): void;
}