export function nextRow(
  current: number,
  total: number,
): number {
  return Math.min(
    current + 1,
    total - 1,
  );
}

export function previousRow(
  current: number,
): number {
  return Math.max(
    current - 1,
    0,
  );
}

export function firstRow(): number {
  return 0;
}

export function lastRow(
  total: number,
): number {
  return Math.max(
    0,
    total - 1,
  );
}