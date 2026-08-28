import type { SearchEngineContract, SearchResult } from "@/platform/contracts";

export class SearchEngine implements SearchEngineContract {
  private readonly cache = new Map<string, SearchResult>();

  async search<T = unknown>(query: string): Promise<SearchResult<T>> {
    const cached = this.cache.get(query) as SearchResult<T> | undefined;

    if (cached !== undefined) {
      return cached;
    }

    const result: SearchResult<T> = {
      items: [],
      total: 0,
    };

    this.cache.set(query, result);

    return result;
  }

  clear(): void {
    this.cache.clear();
  }
}
