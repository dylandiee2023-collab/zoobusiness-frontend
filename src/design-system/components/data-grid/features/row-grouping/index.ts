export interface RowGroup<T = Record<string, unknown>> {
  key: string;

  rows: T[];
}

export function groupRows<T extends Record<string, unknown>>(
  rows: T[],
  field: keyof T,
): RowGroup<T>[] {
  const groups = new Map<string, T[]>();

  for (const row of rows) {
    const key = String(row[field]);

    const list = groups.get(key);

    if (list) {
      list.push(row);
    } else {
      groups.set(key, [row]);
    }
  }

  return Array.from(groups.entries()).map(([key, rows]) => ({
    key,
    rows,
  }));
}
