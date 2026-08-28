import type { DataSource } from "../data-source";

export class DataSourceAdapter<T = Record<string, unknown>> {
  private readonly source: DataSource<T>;

  constructor(source: DataSource<T>) {
    this.source = source;
  }

  async fetch(page: number, pageSize: number) {
    return this.source.load(page, pageSize);
  }
}
