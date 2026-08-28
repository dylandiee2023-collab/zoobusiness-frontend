export function updateCell<T extends Record<string, unknown>>(
  row: T,
  field: keyof T,
  value: T[keyof T],
): T {
  return {
    ...row,
    [field]: value,
  };
}
