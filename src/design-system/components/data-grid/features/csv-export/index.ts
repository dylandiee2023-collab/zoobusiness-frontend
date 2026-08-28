export function exportToCsv<T extends Record<string, unknown>>(
  rows: readonly T[],
): string {
  if (rows.length === 0) {
    return "";
  }

  const first = rows[0];

  if (!first) {
    return "";
  }

  const headers = Object.keys(first);

  const lines = rows.map((row) =>
    headers.map((header) => JSON.stringify(row[header])).join(","),
  );

  return [headers.join(","), ...lines].join("\n");
}
