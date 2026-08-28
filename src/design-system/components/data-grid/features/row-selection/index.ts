export function isSelected(selected: string[], id: string): boolean {
  return selected.includes(id);
}

export function selectRow(selected: string[], id: string): string[] {
  if (selected.includes(id)) {
    return selected;
  }

  return [...selected, id];
}

export function unselectRow(selected: string[], id: string): string[] {
  return selected.filter((value) => value !== id);
}
