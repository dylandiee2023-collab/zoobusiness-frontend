export function fillDown<T>(
  rows: T[],
  start: number,
  end: number,
): T[] {
  const next = [...rows];

  const value =
    next[start];

  if (
    value === undefined
  ) {
    return next;
  }

  for (
    let index =
      start + 1;
    index <= end;
    index++
  ) {
    next[index] =
      value;
  }

  return next;
}