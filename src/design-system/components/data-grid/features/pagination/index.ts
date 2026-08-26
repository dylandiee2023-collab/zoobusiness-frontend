export function paginateRows<
  T,
>(
  rows: T[],
  page: number,
  pageSize: number,
): T[] {
  const start =
    (page - 1) *
    pageSize;

  return rows.slice(
    start,
    start + pageSize,
  );
}

export function totalPages(
  totalRows: number,
  pageSize: number,
): number {
  return Math.max(
    1,
    Math.ceil(
      totalRows /
        pageSize,
    ),
  );
}