export function optimisticUpdate<
  T,
>(
  rows: T[],
  index: number,
  value: T,
): T[] {
  const next = [
    ...rows,
  ];

  if (
    index >= 0 &&
    index < next.length
  ) {
    next[index] =
      value;
  }

  return next;
}