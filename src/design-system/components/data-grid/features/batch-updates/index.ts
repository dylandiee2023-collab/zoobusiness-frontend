export function batchUpdate<
  T,
>(
  rows: T[],
  updater: (
    row: T,
  ) => T,
): T[] {
  return rows.map(
    updater,
  );
}