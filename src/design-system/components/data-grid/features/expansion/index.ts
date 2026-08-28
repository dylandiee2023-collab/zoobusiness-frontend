export function toggleExpanded(expanded: string[], id: string): string[] {
  return expanded.includes(id)
    ? expanded.filter((value) => value !== id)
    : [...expanded, id];
}

export function collapseAll(): string[] {
  return [];
}
