export interface DataSourceResult<
  T = Record<string, unknown>,
> {
  rows: T[];

  total: number;
}

export interface DataSource<
  T = Record<string, unknown>,
> {
  load(
    page: number,
    pageSize: number,
  ): Promise<
    DataSourceResult<T>
  >;
}