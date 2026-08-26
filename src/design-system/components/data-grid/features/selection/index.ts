export function toggleSelection(
  selected: string[],
  id: string,
): string[] {
  return selected.includes(
    id,
  )
    ? selected.filter(
        (value) =>
          value !== id,
      )
    : [
        ...selected,
        id,
      ];
}

export function clearSelection(): string[] {
  return [];
}

export function selectAll(
  ids: string[],
): string[] {
  return [...ids];
}