export interface TreeRow<T = Record<string, unknown>> {
  id: string;

  data: T;

  children?: TreeRow<T>[] | undefined;
}

export function flattenTree<T = Record<string, unknown>>(
  nodes: TreeRow<T>[],
): TreeRow<T>[] {
  const result: TreeRow<T>[] = [];

  function walk(items: TreeRow<T>[]) {
    for (const item of items) {
      result.push(item);

      if (item.children) {
        walk(item.children);
      }
    }
  }

  walk(nodes);

  return result;
}
